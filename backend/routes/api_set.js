const bodyParser = require("body-parser");
const Exercise = require("../models/exercise");
const Session = require("../models/training_session");
const Movement = require("../models/movement");
const config = require("../../config");

module.exports = function(app, express) {
  const apiRouter = express.Router();
  // /training/exercise/:id_exercise/set
  // -------------------
  apiRouter
    .route("/training/exercise/:id_exercise/set")

    // ===== POST =======
    .post((req, res) => {
      Exercise.findById(req.params.id_exercise)
        .exec()
        .then(exercise => {
          const s = {
            repetitions: req.body.repetitions,
            weight: req.body.weight,
            rest: req.body.rest
          };
          exercise.sets.push(s);

          return exercise.save();
        })
        .then(() => {
          res.json({ message: "ok" });
        })
        .catch(err => {
          res.send(err);
        });
    })

    // ===== GET =======
    .get((req, res) => {
      Exercise.findById(req.params.id_exercise)
        .select("sets")
        .exec()
        .then(sets => {
          res.json({ message: "ok", sets });
        })
        .catch(err => {
          res.send(err);
        });
    });

  // /training/exercise/:id_exercise/set/:num
  // -------------------
  apiRouter
    .route("/training/exercise/:id_exercise/set/:num")

    // ===== GET =======
    .get((req, res) => {
      Exercise.findById(req.params.id_exercise)
        .slice("sets", [parseInt(req.params.num), 1])
        .exec()
        .then(set => {
          set = set.sets[0];

          res.json({ message: "ok", set });
        })
        .catch(err => {
          res.send(err);
        });
    })

    // ===== PUT =======
    .put((req, res) => {
      const rep = `sets.${req.params.num}.repetitions`;
      const weight = `sets.${req.params.num}.weight`;
      const rest = `sets.${req.params.num}.rest`;

      const query = {};

      if (req.body.weight) query[weight] = parseFloat(req.body.weight);
      if (req.body.rest) query[rest] = parseFloat(req.body.rest);
      if (req.body.repetitions) query[rep] = parseFloat(req.body.repetitions);

      Exercise.update({ _id: req.params.id_exercise }, { $set: query })
        .exec()
        .then(() => {
          res.json({ message: "ok" });
        })
        .catch(err => {
          res.send(err);
        });
    })

    // ===== DELETE =======
    .delete((req, res) => {
      const set = `sets.${req.params.num}`;

      const query = {};
      query[set] = 1;

      Exercise.update({ _id: req.params.id_exercise }, { $unset: query })
        .exec()
        .then(() => Exercise.update({ _id: req.params.id_exercise }, { $pull: { sets: null } }).exec())
        .then(() => {
          res.json({ message: "ok" });
        })
        .catch(err => {
          res.send(err);
        });
    });

  return apiRouter;
};
