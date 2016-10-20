var bodyParser = require('body-parser');
var User       = require('../models/user');
var config     = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

  var apiRouter = express.Router();

  // /users
  // ----------------------------------------------------
  apiRouter.route('/users')

  .post(function(req, res) {

    var user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;
    user.birthday = req.body.birthday;
    user.weigth = req.body.weigth;
    user.height = req.body.height;

    user.save(function(err) {
      if (err) {
        if (err.code == 11000)
        return res.json({ success: false, message: 'A user with that username already exists. '});
        else
        return res.send(err);
      }

      res.json({ message: 'User created!' });
    });

  })

  .get(function(req, res) {

    User.find({}, function(err, users) {
      if (err) res.send(err);

      res.json(users);
    });
  });


  //  /users/:user_id
  // ----------------------------------------------------
  apiRouter.route('/users/:user_id')

  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);

      res.json(user);
    });
  })

  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {

      if (err) res.send(err);

      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;
      if (req.body.birthday) user.birthday = req.body.birthday;
      if (req.body.weight) user.weight = req.body.weight;
      if (req.body.height) user.height = req.body.height;


      user.save(function(err) {
        if (err) res.send(err);

        res.json({ message: 'User updated!' });
      });

    });
  })

  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err) res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });

  return apiRouter;
};
