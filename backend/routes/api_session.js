const Session = require('../models/training_session');
const User = require('../models/user');

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = function(app, express) {
  const apiRouter = express.Router();
  // /training/sessions/
  // -------------------
  apiRouter
    .route('/training/sessions/')
    // ===== POST =======
    .post((req, res) => {
      let profile = req.body.profile || req.query.profile || req.headers.profile;

      if (IsJsonString(profile)) profile = JSON.parse(profile);

      const id = profile.user_id;

      User.findOne({ auth0id: id }, '_id')
        .exec()
        .then(user => {
          const session = new Session();

          if (req.body.time) session.time = req.body.time;
          if (req.body.date) session.date = new Date(req.body.date);
          session.user = user._id;
          return session.save();
        })
        .then(session => [
          User.findOneAndUpdate({ auth0id: id }, { $push: { sessions: session._id } }),
          session
        ])
        .then(values => {
          res.json({ message: 'ok', session: values[1]._id });
        })
        .catch(err => {
          res.send(err);
        });
    })

    // ===== GET =======
    .get((req, res) => {
      let profile = req.body.profile || req.query.profile || req.headers.profile;
      if (profile) profile = JSON.parse(profile);

      if (profile !== null && profile !== undefined) {
        const id = profile.user_id;
        User.findOne({ auth0id: id }, '_id')
          .exec()
          .then(user => Session.find({ user: user._id }))
          .then(sessions => {
            res.json(sessions);
          })
          .catch(err => {
            res.send(err);
          });
      } else {
        res.json({ error: 'No profile found' });
      }
    });

  // /training/sessions/:id_session
  // -------------------
  apiRouter
    .route('/training/sessions/:id_session')
    // ===== GET =======
    .get(async (req, res) => {
      try {
        const session = await Session.findById(req.params.id_session)
          .populate('exercises')
          .exec();
        const sessionComplete = await Session.populate(session, {
          path: 'exercises.movement',
          model: 'Movement'
        });

        if (sessionComplete) {
          res.json({ message: 'ok', sessionComplete });
        } else {
          res.json({ message: 'Error - No data' });
        }
      } catch (err) {
        res.send(err);
      }
    })

    // ===== DELETE =======
    .delete((req, res) => {
      Session.findById(req.params.id_session)
        .exec()
        .then(session => session.remove())
        .then(() => {
          res.json({ message: 'ok' });
        })
        .catch(err => {
          res.send(err);
        });
    });

  apiRouter
    .route('/training/sessioncomplete/')
    // ===== POST =======
    .post((req, res) => {
      let profile = req.body.profile || req.query.profile || req.headers.profile;
      profile = JSON.parse(profile);
      const id = profile.user_id;

      User.findOne({ auth0id: id }, '_id')
        .exec()
        .then(user => {
          const session = new Session();

          if (req.body.time) session.time = req.body.time;
          if (req.body.date) session.date = new Date(req.body.date);
          session.user = user._id;
          return session.save();
        })
        .then(session => [
          User.findOneAndUpdate({ auth0id: id }, { $push: { sessions: session._id } }),
          session
        ])
        .then(values => {
          res.json({ message: 'ok', session: values[1]._id });
        })
        .catch(err => {
          res.send(err);
        });
    });

  return apiRouter;
};
