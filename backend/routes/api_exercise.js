const bodyParser = require('body-parser');
const Exercise = require('../models/exercise');
const Session = require('../models/training_session');
const Movement = require('../models/movement');
const config = require('../../config');

module.exports = function(app, express) {
  const apiRouter = express.Router();

  // /training/exercise/
  //----------
  apiRouter
    .route('/training/sessions/:id_session/exercise/')

    // ===== POST =======
    .post((req, res) => {
      if (!req.body.movement || !req.params.id_session) {
        res.json({
          success: false,
          message: 'fail'
        });
      } else {
        const exercise = new Exercise();

        Movement.findOne({ name: req.body.movement })
          .exec()
          .then(movement => {
            const result = [];

            if (!movement) throw { message: 'fail', detail: 'no movement' };

            return Session.findById(req.params.id_session)
              .exec()
              .then(session => {
                if (!session) throw { message: 'fail', detail: 'no session' };
                return [movement, session];
              });
          })
          .then(result => {
            exercise.movement = result[0]._id;
            exercise.session = result[1]._id;

            if (req.body.sets) {
              req.body.sets.forEach(set => {
                exercise.sets.push(set);
              });
            }

            return exercise.save();
          })
          .then(exercise =>
            Session.findOneAndUpdate({ _id: req.params.id_session }, { $push: { exercises: exercise._id } })
          )
          .then(session => {
            res.json({ message: 'ok' });
          })
          .catch(err => {
            res.send(err);
          });
      }
    });

  // /training/exercise/:id_exercise
  //----------
  apiRouter
    .route('/training/exercise/:id_exercise')
    // ===== GET =======
    .get((req, res) => {
      Exercise.findById(req.params.id_exercise)
        .exec()
        .then(exercise => {
          res.json(exercise);
        })
        .catch(err => {
          res.send({ err, message: 'fail' });
        });
    })

    // ===== DELETE =======
    .delete((req, res) => {
      Exercise.findById(req.params.id_exercise)
        .exec()
        .then(exercise => exercise.remove())
        .then(() => {
          res.json({ message: 'ok' });
        })
        .catch(err => {
          res.send({ err, message: 'fail' });
        });
    });

  return apiRouter;
};
