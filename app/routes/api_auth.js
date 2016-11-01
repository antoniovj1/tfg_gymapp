var bodyParser = require('body-parser');
var User       = require('../models/user');
var Movement	 = require('../models/movement');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// ===== POST =======
	apiRouter.post('/authenticate', function(req, res) {
		if (!req.body.password || !req.body.username) {
			res.json({
				success: false,
				message: 'fail'
			});
		}

		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user) {

			if (err) throw err;

			if (!user) {
				res.json({
					success: false,
					message: 'fail'
				});
			} else if (user) {

				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					res.json({
						success: false,
						message: 'fail'
					});
				} else {


					var token = jwt.sign({
						_id: user._id,
						name: user.name,
						username: user.username
					}, superSecret, {
						expiresIn: '24h'
					});

					res.json({
						success: true,
						message: 'ok',
						token: token
					});
				}

			}

		});
	});

	// ===== MIDDLEWARE =======
	apiRouter.use(function(req, res, next) {
		var token =  jwt.sign({
			name: "antonio",
			username: "antonio"
		}, superSecret, {
			expiresIn: '24h'
		}); //req.body.token || req.query.token || req.headers['x-access-token'];

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

	return apiRouter;
};
