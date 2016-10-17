var bodyParser = require('body-parser');
var Sesion	   = require('../models/training_sesion');
var User  	   = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');


module.exports = function(app, express) {

  var apiRouter = express.Router();

  apiRouter.route('/training/sesion/')

  .post(function(req, res){

    var sesion = new Sesion();

    sesion.time = req.body.time;

    User.findOne({username: req.decoded.username}, '_id', function(err, user) {
      getUser(user);
    });

    function getUser(user_id){
      sesion.user = user_id._id;

      sesion.save(function(err) {
        if (err) return res.send(err);

        res.json({ message: 'sesion created!' });
      });
    }
  })

  .get(function(req, res) {

    User.findOne({username: req.decoded.username}, '_id', function(err, user) {
      getUser(user);
    });

    function getUser(user_id){
      Sesion.find({user:user_id._id}, function(err, sesion) {
        if (err) res.send(err);
        res.json(sesion);
      });
    }
  })

  apiRouter.route('/training/sesion/byId/:id_sesion')

  .get(function(req, res) {
    Sesion.findById(req.params.id_sesion, function(err, sesion) {
      if (err) res.send(err);
      res.json(sesion);
    });
  })


  .delete(function(req, res) {
    Sesion.remove({_id:req.params.id_sesion }, function(err, sesion) {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });

  return apiRouter;
};
