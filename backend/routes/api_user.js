const User = require('../models/user');

module.exports = function(app, express) {
  const apiRouter = express.Router();

  // /users
  // ------
  apiRouter
    .route('/users')

    // ===== GET =======
    .get((req, res) => {
      User.find({})
        .exec()
        .then(users => {
          res.json(users);
        })
        .catch(err => {
          res.send(err);
        });
    });

  //  /user
  // -----------------
  apiRouter
    .route('/user/:id')

    // ===== GET =======
    .get((req, res) => {
      const id = req.params.id;

      User.findOne({ auth0id: id })
        .exec()
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.send(err);
        });
    });

  return apiRouter;
};
