var bodyParser = require('body-parser');
var User       = require('../models/user');
var config     = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

  var apiRouter = express.Router();

  // /users
  // ------
  apiRouter.route('/users')

  // ===== GET =======
  .get(function(req, res) {
    User.find({}).exec()
      .then(function(users){
        res.json(users);
      })
      .catch(function(err){
        res.send(err);
      })
  });

  //  /users/:user_id
  // -----------------
  apiRouter.route('/users/:user_id')

  // ===== GET =======
  .get(function(req, res) {
    User.findById(req.params.user_id).exec()
      .then(function(user){
        res.json(user);
      })
      .catch(function(err){
        res.send(err);
      });
  })


  // ===== PUT =======
  .put(function(req, res) {
    User.findById(req.params.user_id).exec()
      .then(function(user){
          if (req.body.name) user.name = req.body.name;
          if (req.body.username) user.username = req.body.username;
          if (req.body.password) user.password = req.body.password;
          if (req.body.birthday) user.birthday = req.body.birthday;
          if (req.body.weight) user.weight = req.body.weight;
          if (req.body.height) user.height = req.body.height;

          return user.save();
      })
      .then(function(user){
          res.json({ message: 'ok', user });
      })
      .catch(function(err){
          res.send(err);
      });
  })

 // ===== DELETE =======
  .delete(function(req, res) {
    User.findById(req.params.user_id).exec()
        .then(function(user){
            user.remove();
        })
        .then(function(){
            res.json({ message: 'ok' });
        })
        .catch(function(err){
            res.send(err);
        });
  });

  //  /users/me
  // ----------------------------------------------------
  apiRouter.route('/users_me')

  // ===== GET =======
  .get(function(req, res) {
    User.find(req.decoded.username).exec()
        .then(function(user){
            res.json(user);
        })
        .catch(function(err){
            res.json(err);
        })
  });

  return apiRouter;
};
