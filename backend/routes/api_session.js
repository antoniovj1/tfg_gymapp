const bodyParser = require("body-parser");
const Session = require("../models/training_session");
const Exercise = require("../models/exercise");
const Movement = require("../models/movement");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = function(app, express) {
  const apiRouter = express.Router();
  // /training/sessions/
  // -------------------
  apiRouter
    .route("/training/sessions/")
    // ===== POST =======
    .post((req, res) => {
      let profile =
        req.body.profile || req.query.profile || req.headers.profile;
      profile = JSON.parse(profile);
      const id = profile.user_id;

      User.findOne({ auth0id: id }, "_id")
        .exec()
        .then(user => {
          const session = new Session();

          if (req.body.time) session.time = req.body.time;

          if (req.body.date) session.date = new Date(req.body.date);

          session.user = user._id;

          return session.save();
        })
        .then(session => [
          User.findOneAndUpdate(
            { auth0id: id },
            { $push: { sessions: session._id } }
          ),
          session
        ])
        .then(values => {
          res.json({ message: "ok", session: values[1]._id });
        })
        .catch(err => {
          res.send(err);
        });
    })

    // ===== GET =======
    .get((req, res) => {
      let profile =
        req.body.profile || req.query.profile || req.headers.profile;
      profile = JSON.parse(profile);

      if (profile != null) {
        const id = profile.user_id;
        User.findOne({ auth0id: id }, "_id")
          .exec()
          .then(user => Session.find({ user: user._id }))
          .then(sessions => {
            res.json(sessions);
          })
          .catch(err => {
            res.send(err);
          });
      } else {
        res.json({});
      }
    });

  // /training/sessions/:id_session
  // -------------------
  apiRouter
    .route("/training/sessions/:id_session")
    // ===== GET =======
    .get((req, res) => {
      Session.findById(req.params.id_session)
        .populate("exercises")
        .exec()
        .then(session =>
          Session.populate(
            session,
            { path: "exercises.movement", model: "Movement" },
            (err, session) => {
              if (err) throw err;
              return session;
            }
          )
        )
        .then(session => {
          res.json({ message: "ok", session });
        })
        .catch(err => {
          res.send(err);
        });
    })

    // ===== DELETE =======
    .delete((req, res) => {
      Session.findById(req.params.id_session)
        .exec()
        .then(session => session.remove())
        .then(session => {
          res.json({ message: "ok" });
        })
        .catch(err => {
          res.send(err);
        });
    });

  return apiRouter;
};
