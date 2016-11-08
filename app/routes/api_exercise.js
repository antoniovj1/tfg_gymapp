var bodyParser = require('body-parser');
var Exercise = require('../models/exercise');
var Session = require('../models/training_session');
var Movement = require('../models/movement');
var config = require('../../config');


module.exports = function (app, express) {

  var apiRouter = express.Router();

  // /training/exercise/
  //----------
  apiRouter.route('/training/exercise/')

    // ===== POST =======
    .post(function (req, res) {
      if (!req.body.movement || !req.body.session) {
        res.json({
          success: false,
          message: 'fail'
        });
      } else {
        var exercise = new Exercise();

        Movement.findById(req.body.movement).exec()
          .then(function (movement) {
            var result = [];

            if (!movement)
              throw { message: 'fail', detail: 'no movement' };
            return Session.findById(req.body.session).exec()
              .then(function (session) {
                if (!session)
                  throw { message: 'fail', detail: 'no session' };
                return [movement, session]
              })
          })
          .then(function (result) {
            exercise.session = result[0]._id;
            exercise.movement = result[1]._id;

            return exercise.save();
          })
          .then(function (exercise) {
            res.json({ message: 'ok', exercise });
          })
          .catch(function (err) {
            res.send(err);
          })
      }
    })


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
        .then(function(){
          res.json({ message: 'ok' });
        })
        .catch(function (err) {
          res.send({ err, message: 'fail' });
        })
    });

  return apiRouter;
};
