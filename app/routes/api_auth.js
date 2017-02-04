var bodyParser = require('body-parser');
var User = require('../models/user');
var Movement = require('../models/movement');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var superSecret = config.secret;

module.exports = function (app, express) {

	var apiRouter = express.Router();

	apiRouter.route('/test')
		.get(function (req, res) {
			res.send({ message: 'TEST API - Ok' });
		})


	//MIDDLEWARE
	//----------
	apiRouter.use(function (req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		var profile = req.body.profile || req.query.profile || req.headers['profile'];

		if (token) {

			jwt.verify(token, config.secret, function (err, decoded) {
				if (err) {
					return res.status(403).send({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					if (profile) {
						profile = JSON.parse(profile)
						
						User.find({ auth0id: profile.user_id }).exec()
							.then(function (user) {
								if (user.length == 0) {
									var userNew = new User();
									userNew.auth0id = profile.user_id;
									userNew.save().then(function () {
									})
										.catch(function (err) {
											console.log(err);
										})
								}
							})
							.catch(function (err) {
								console.log(err);
							})
					}
					next();
				}
			});

		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}

	});

	return apiRouter;
};
