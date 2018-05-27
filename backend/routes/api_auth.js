const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const superSecret = config.secret;

module.exports = function(app, express) {
  const apiRouter = express.Router();

  apiRouter.route('/test').get((req, res) => {
    res.send({ message: 'TEST API - Ok' });
  });

  // MIDDLEWARE
  //----------
  apiRouter.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    let profile = req.body.profile || req.query.profile || req.headers.profile;

    if (token) {
      jwt.verify(token, superSecret, err => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        }
        if (profile !== 'null') {
          try {
            profile = JSON.parse(profile);
          } catch (error) {
            console.log('Null profile\n');
          }

          if (profile != null && 'user_id' in profile) {
            User.find({ auth0id: profile.user_id })
              .exec()
              .then(user => {
                if (user.length === 0) {
                  const userNew = new User();
                  userNew.auth0id = profile.user_id;
                  userNew
                    .save()
                    .then(() => {})
                    .catch(error => {
                      console.log(error);
                    });
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
        next();
        return 0;
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
    return 0;
  });

  return apiRouter;
};
