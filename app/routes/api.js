var bodyParser = require('body-parser');
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	apiRouter.post('/authenticate', function(req, res) {
	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({
	      	success: false,
	      	message: 'Authentication failed. User not found.'
	    	});
	    } else if (user) {

	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({
	        	success: false,
	        	message: 'Authentication failed. Wrong password.'
	      	});
	      } else {


	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresIn: '24h'
	        });

	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }

	    }

	  });
	});

	apiRouter.use(function(req, res, next) {
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  if (token) {

	    jwt.verify(token, superSecret, function(err, decoded) {

	      if (err) {
	        res.status(403).send({
	        	success: false,
	        	message: 'Failed to authenticate token.'
	    	});
	      } else {
	        req.decoded = decoded;

	        next();
	      }
	    });

	  } else {
   	 	res.status(403).send({
   	 		success: false,
   	 		message: 'No token provided.'
   	 	});

	  }
	});


	apiRouter.get('/', function(req, res) {
		res.json({ message: 'api test' });
	});

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
