var bodyParser = require('body-parser');
var Session	   = require('../models/training_session');
var User  	   = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');


module.exports = function(app, express) {

  var apiRouter = express.Router();

  apiRouter.route('/training/session/')

  .post(function(req, res){

    var session = new Session();

    session.time = req.body.time;

    User.findOne({username: req.decoded.username}, '_id', function(err, user) {
      getUser(user);
    });

    function getUser(user_id){
      session.user = user_id._id;

      session.save(function(err) {
        if (err) return res.send(err);

        res.json({ message: 'ok' });
      });
    }
  })

  .get(function(req, res) {

    User.findOne({username: req.decoded.username}, '_id', function(err, user) {
      getUser(user);
    });

    function getUser(user_id){
      Session.find({user:user_id._id}, function(err, session) {
        if (err) res.send(err);
        res.json(session);
      });
    }
  })

  apiRouter.route('/training/session/byId/:id_session')

  .get(function(req, res) {
    Session.findById(req.params.id_session, function(err, session) {
      if (err) res.send(err);
      res.json({ message: 'ok' ,session});
    });
  })


  .delete(function(req, res) {
    Session.remove({_id:req.params.id_session }, function(err, session) {
      if (err) res.send(err);
      res.json({ message: 'ok' });
    });
  });

  return apiRouter;
};
