const subDays = require('date-fns/sub_days');
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
    .route('/training/musclestats/:days')
    // ===== GET =======
    .get(async (req, res) => {
      try {
        const finalDate = new Date();
        const initDate = subDays(finalDate, req.params.days + 100000);
        const sessions = await Session.find({ date: { $gte: initDate, $lte: finalDate } })
          .populate('exercises')
          .exec();

        const summaryItem = [];
        await Promise.all(
          sessions.map(async session => {
            const sessionComplete = await Session.populate(session, {
              path: 'exercises.movement',
              model: 'Movement'
            });
            await Promise.all(
              sessionComplete.exercises.map(async exercise => {
                const { sets } = exercise;
                const totalReps = sets.reduce((prevVal, elem) => prevVal + elem.repetitions, 0);
                const { muscles } = exercise.movement;
                summaryItem.push({ totalReps, muscles });
              })
            );
          })
        );

        const summary = [];

        summaryItem.forEach();

        res.send(summaryItem);
      } catch (err) {
        res.send(err);
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
