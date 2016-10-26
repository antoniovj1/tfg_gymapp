var bodyParser = require('body-parser');
var Exercise	 = require('../models/exercise');
var Session	 = require('../models/training_session');
var Movement	 = require('../models/movement');
var config     = require('../../config');


module.exports = function(app, express) {

  var apiRouter = express.Router();

  apiRouter.route('/training/exercise/')

  // ===== POST =======
  .post(function(req, res){

    if(!req.body.movement || !req.body.session){
      res.json({
        success: false,
        message: 'fail'
      });
    } else {
      var exercise = new Exercise();

      Movement.find({_id: req.body.movement._id}, function (err, movement){
        if(movement){
          Session.find({_id: req.body.session._id}, function (err, session){
            if(session){
              exercise.session = session._id;
              exercise.movement = movement._id;

              exercise.save(function(err) {
                if (err) return res.send(err);

                res.json({ message: 'ok' });
              });
            }
          })
        }
      });
    }
  })


  apiRouter.route('/training/exercise/:id_exercise')
  // ===== GET =======
  .get(function(req, res) {
    Exercise.findById(req.params.id_exercise, function(err, exercise) {
      if (err) {
        res.send({err, message:'fail'});
      }
      res.json(exercise);
    });
  })

  // ===== DELETE =======
  .delete(function(req, res) {
      Exercise.remove({_id:req.params.id_exercise }, function(err, exercise) {
        if (err) {
          res.send({err,message: 'fail'});
        }
        else if (!exercise) {
          res.send({success: false, message: 'fail' });
        } else {
          res.json({ message: 'ok' });
        }
      });
  });

  return apiRouter;
};
