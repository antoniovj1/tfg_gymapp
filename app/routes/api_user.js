var bodyParser = require('body-parser');
var User = require('../models/user');
var config = require('../../config');

var superSecret = config.secret;

module.exports = function (app, express) {

    var apiRouter = express.Router();

    // /users
    // ------
    apiRouter.route('/users')

        // ===== GET =======
        .get(function (req, res) {
            User.find({}).exec()
                .then(function (users) {
                    res.json(users);
                })
                .catch(function (err) {
                    res.send(err);
                })
        });

    //  /user
    // -----------------
    apiRouter.route('/user')

        // ===== GET =======
        .get(function (req, res) {
            var profile = req.body.profile || req.query.profile || req.headers['profile'];
            profile = JSON.parse(profile);
            var id = profile.user_id;


            User.findOne({ auth0id: id }).exec()
                .then(function (user) {
                    res.json(user);
                })
                .catch(function (err) {
                    res.send(err);
                });
        })


    return apiRouter;
};
