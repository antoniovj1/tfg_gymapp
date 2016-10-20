var bodyParser = require('body-parser');
var Exercise	 = require('../models/exercise');
var Movement	 = require('../models/movement');
var config     = require('../../config');


module.exports = function(app, express) {

  var apiRouter = express.Router();

  apiRouter.route('/training/exercise/:id_session')

  .post(function(req, res){

    var exercise = new Exercise();

    exercise.session = req.params.id_session;

    Movement.findOne({name: req.body.movement}, '_id', function(err, movement) {
      getMovement(movement);
    });

    function getMovement(movement_id){
      exercise.movement = movement_id._id;

      exercise.save(function(err) {
        if (err) return res.send(err);

        res.json({ message: 'ok' });
      });
    }
  })

  .get(function(req, res) {
    Exercise.find({exercise:req.params.id_exercise}, function(err, exercise) {
      if (err) res.send(err);
      res.json(exercise);
    });
  })

  apiRouter.route('/training/exercise/byId/:id_exercise')

  .get(function(req, res) {
    Exercise.findById(req.params.id_exercise, function(err, exercise) {
      if (err) res.send(err);
      res.json(exercise);
    });
  })


  .delete(function(req, res) {
    Exercise.remove({_id:req.params.id_exercise }, function(err, exercise) {
      if (err) res.send(err);
      res.json({ message: 'ok' });
    });
  });

  return apiRouter;
};
