const subDays = require('date-fns/sub_days');
const _ = require('lodash');

const User = require('../models/user');
const Session = require('../models/training_session');

module.exports = function(app, express) {
  const apiRouter = express.Router();
  // /training/stats/
  // -------------------
  apiRouter
    .route('/training/topn/')
    // ===== GET =======
    .get(async (req, res) => {
      try {
        const sessions = await Session.find()
          .populate('exercises')
          .exec();

        const exercises = [];

        await Promise.all(
          sessions.map(async session => {
            const sessionComplete = await Session.populate(session, {
              path: 'exercises.movement',
              model: 'Movement'
            });
            sessionComplete.exercises.map(async exercise => {
              exercises.push(exercise);
            });
          })
        );

        const summary = [];
        exercises.forEach(i => {
          const summaryItem = {};

          summaryItem.timestamp = i.timestamp;
          summaryItem.name = i.movement.name;
          let maxWeight = 0;
          i.sets.forEach(j => {
            if (j.weight > maxWeight) {
              maxWeight = j.weight;
            }
          });
          summaryItem.maxWeight = maxWeight;
          summary.push(summaryItem);
        });

        const groups = _(summary)
          .groupBy(x => x.name)
          .map((value, key) => ({ name: key, values: value }))
          .value();

        groups.forEach(group => {
          group.values = group.values.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        });

        res.json(groups);
      } catch (err) {
        res.send(err);
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
            sessionComplete.exercises.map(async exercise => {
              const { sets } = exercise;
              const totalReps = sets.reduce((prevVal, elem) => prevVal + elem.repetitions, 0);
              const { muscles } = exercise.movement;
              for (let i = 0; i < muscles.length; i += 1) {
                muscles[i].percentage *= totalReps;
                summaryItem.push(muscles[i]);
              }
            });
          })
        );

        const summary = {};
        summaryItem.forEach(i => {
          if (i.name in summary) {
            summary[i.name] += Number(i.percentage);
          } else {
            summary[i.name] = Number(i.percentage);
          }
        });

        res.json(summary);
      } catch (err) {
        res.send(err);
      }
    });

  apiRouter
    .route('/training/totals')
    // ===== GET =======
    .get(async (req, res) => {
      try {
        const sessions = await Session.find()
          .populate('exercises')
          .exec();

        const totals = {
          time: 0,
          repetitions: 0,
          weight: 0
        };

        let reps = 0;
        let weight = 0;

        await Promise.all(
          sessions.map(async session => {
            const sessionComplete = await Session.populate(session, {
              path: 'exercises.movement',
              model: 'Movement'
            });
            sessionComplete.exercises.map(async exercise => {
              const { sets } = exercise;
              reps = sets.reduce((prevVal, elem) => prevVal + elem.repetitions, 0);
              weight = sets.reduce((prevVal, elem) => prevVal + elem.repetitions * elem.weight, 0);
            });
            totals.time += session.time;
            totals.repetitions += reps;
            totals.weight += weight;
          })
        );

        res.json(totals);
      } catch (err) {
        res.send(err);
      }
    });

  return apiRouter;
};
