const bodyParser = require('body-parser');
const Exercise = require('../models/exercise');
const Session = require('../models/training_session');
const Movement = require('../models/movement');
const config = require('../../config');


module.exports = function (app, express) {

    const apiRouter = express.Router();

    // /training/exercise/
  //----------
  apiRouter.route('/training/sessions/:id_session/exercise/')

    // ===== POST =======
    .post(function (req, res) {
      if (!req.body.movement || !req.params.id_session) {
        res.json({
          success: false,
          message: 'fail'
        });
      } else {
          const exercise = new Exercise();

          Movement.findOne({ name: req.body.movement }).exec()
          .then(function (movement) {

              const result = [];

              if (!movement)
              throw { message: 'fail', detail: 'no movement' };

            return Session.findById(req.params.id_session).exec()
              .then(function (session) {
                if (!session)
                  throw { message: 'fail', detail: 'no session' };
                return [movement, session]
              })
          })
          .then(function (result) {
            exercise.movement = result[0]._id;
            exercise.session = result[1]._id;

            if (req.body.sets) {
              req.body.sets.forEach(function (set) {
                exercise.sets.push(set);
              })
            }
            
            return exercise.save();
          })
          .then(function (exercise) {
            return Session.findOneAndUpdate({ _id: req.params.id_session },
              { $push: { exercises: exercise._id } });
          })
          .then(function (session) {
            res.json({ message: 'ok' });
          })
          .catch(function (err) {
            res.send(err);
          })
      }
    });


  // /training/exercise/:id_exercise
  //----------
  apiRouter.route('/training/exercise/:id_exercise')
    // ===== GET =======
    .get(function (req, res) {
      Exercise.findById(req.params.id_exercise).exec()
        .then(function (exercise) {
          res.json(exercise);
        })
        .catch(function (err) {
          res.send({ err, message: 'fail' });
        })
    })

    // ===== DELETE =======
    .delete(function (req, res) {
      Exercise.findById(req.params.id_exercise).exec()
        .then(function (exercise) {
          return exercise.remove();
        })
        .then(function () {
          res.json({ message: 'ok' });
        })
        .catch(function (err) {
          res.send({ err, message: 'fail' });
        })
    });

  return apiRouter;
};
