const bodyParser = require('body-parser');
const User = require('../models/user');
const config = require('../../config');

const superSecret = config.secret;

module.exports = function (app, express) {

    const apiRouter = express.Router();

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
            let profile = req.body.profile || req.query.profile || req.headers['profile'];
            profile = JSON.parse(profile);
            const id = profile.user_id;


            User.findOne({ auth0id: id }).exec()
                .then(function (user) {
                    res.json(user);
                })
                .catch(function (err) {
                    res.send(err);
                });
        });


    return apiRouter;
};
