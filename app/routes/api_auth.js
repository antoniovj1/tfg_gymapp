var bodyParser = require('body-parser');
var User       = require('../models/user');
var Movement	 = require('../models/movement');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	apiRouter.route('/users')

	// ===== POST =======
	.post(function(req, res) {
		var user = new User();
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;
		user.birthday = req.body.birthday;
		user.weigth = req.body.weigth;
		user.height = req.body.height;

		user.save()
			.then(function(){
				res.json({ message: 'ok' });
			})
			.catch(function (err) {
				if (err) {
					if (err.code == 11000)
						res.json({ success: false, message: 'A user with that username already exists. '});
					else
						res.send(err);
				}
			})

	});


	// POST
	//-----
	apiRouter.post('/authenticate', function(req, res) {
		User.findOne({username: req.body.username})
			.select('name username password').exec()
			.then(function(user){
				if (!req.body.password || !req.body.username) {
					throw {success: false, message: 'fail', detail: "No password or username"};
				}

				if (!user)
					throw {success: false, message: 'fail', detail: "Password or username error"};

			    var validPassword = user.comparePassword(req.body.password);
				if (!validPassword)
					throw {success: false, message: 'fail', detail: "Password or username error"};

				var token = jwt.sign({ _id: user._id,
									  name: user.name,
									  username: user.username,
									  rol: user.role},
									   superSecret,
									  {expiresIn: '24h'});

				res.json({success: true, message: 'ok',token: token});
			})
			.catch(function(err){
				res.send(err);
			})
	});

	//MIDDLEWARE
	//----------
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

	return apiRouter;
};
