const User = require('../models/user');
const Session = require('../models/training_session');
const Set = require('../models/exercise');
const Movement = require('../models/movement');

module.exports = function(app, express) {
  const apiRouter = express.Router();
  // /training/stats/
  // -------------------
  apiRouter
    .route('/training/topfive/')
    // ===== GET =======
    .get((req, res) => {
      let profile = req.body.profile || req.query.profile || req.headers.profile;
      profile = JSON.parse(profile);

      if (profile != null) {
      } else {
        res.json({});
      }
    });

  apiRouter
    .route('/training/musclestats/:day')
    // ===== GET =======
    .get((req, res) => {
      let profile = req.body.profile || req.query.profile || req.headers.profile;
      profile = JSON.parse(profile);

      if (profile != null) {
      } else {
        res.json({});
      }
    });

  apiRouter
    .route('/training/totals/')
    // ===== GET =======
    .get((req, res) => {
      let profile = req.body.profile || req.query.profile || req.headers.profile;
      profile = JSON.parse(profile);

      if (profile != null) {
      } else {
        res.json({});
      }
    });

  return apiRouter;
};
