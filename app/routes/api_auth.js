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

	apiRouter.route('/users')

		// ===== POST =======
		.post(function (req, res) {
			var user = new User();
			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;
			user.birthday = req.body.birthday;
			user.weigth = req.body.weigth;
			user.height = req.body.height;

			user.save()
				.then(function () {
					res.json({ message: 'ok' });
				})
				.catch(function (err) {
					if (err) {
						if (err.code == 11000)
							res.json({ success: false, message: 'A user with that username already exists. ' });
						else
							res.send(err);
					}
				})

		});


	//MIDDLEWARE
	//----------
	apiRouter.use(function (req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		var profile = req.body.profile || req.query.profile || req.headers['profile'];

		if (token && profile) {
			profile = JSON.parse(profile)

			jwt.verify(token, 'NhcRW9jzcj2O2aKk66NXKHqD_ef5l5z5kDIQJ5zJBXU2d4TY6FN7B7xH52vBOsdj', function (err, decoded) {
				if (err) {
					return res.status(403).send({
						success: false,
						message: 'Failed to authenticate token.'
					});
				} else {
					if (profile != null) {
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
