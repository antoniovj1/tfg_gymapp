var bodyParser = require('body-parser');
var Session	   = require('../models/training_session');
var User  	   = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');


module.exports = function(app, express) {

  var apiRouter = express.Router();
  // /training/session/
  // -------------------
  apiRouter.route('/training/session/')

  // ===== POST =======
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

  // ===== GET =======
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

  // /training/session/byId/:id_session
  // -------------------
  apiRouter.route('/training/session/byId/:id_session')

  // ===== GET =======
  .get(function(req, res) {
    Session.findById(req.params.id_session, function(err, session) {
      if (err) res.send(err);
      res.json({ message: 'ok' ,session});
    });
  })

  // ===== DELETE =======
  .delete(function(req, res) {
    Session.remove({_id:req.params.id_session }, function(err, session) {
      if (err) res.send(err);
      res.json({ message: 'ok' });
    });
  });

  return apiRouter;
};
