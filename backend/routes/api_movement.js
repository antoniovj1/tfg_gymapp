const Movement = require('../models/movement');

module.exports = function(app, express) {
  const apiRouter = express.Router();

  // /training/movements
  // -------------------
  apiRouter
    .route('/training/movements')

    // ===== POST =======
    .post((req, res) => {
      /* {
              "name":"Dominadas",
              "material": "Barra",
              "muscles":[{"name":"bicep","percentage":20},
                         {"name":"pecho","percentage":10},
                         {"name":"dorsal","percentage":60},
                         {"name":"abdominales","percentage":10}]
                } */

      const movement = new Movement(req.body);

      movement
        .save()
        .then(movement => {
          res.json({ message: 'ok', movement });
        })
        .catch(err => {
          if (err.code == 11000)
            return res.json({
              success: false,
              message: 'A movement with that name already exists. '
            });
          return res.send(err);
        });
    })

    // ===== GET =======
    .get((req, res) => {
      Movement.find({})
        .exec()
        .then(movements => {
          res.json(movements);
        })
        .catch(err => {
          res.send(err);
        });
    });

  // /training/movementsname
  // -------------------
  apiRouter
    .route('/training/movementsname')
    // ===== GET =======
    .get((req, res) => {
      Movement.find({})
        .select('name -_id')
        .exec()
        .then(movements => {
          res.json(movements);
        })
        .catch(err => {
          res.send(err);
        });
    });

  // /training/movements/:name
  // -------------------
  apiRouter
    .route('/training/movements/:name')
    // ===== GET =======
    .get((req, res) => {
      Movement.findOne({ name: req.params.name })
        .exec()
        .then(movement => {
          if (movement) res.json({ message: 'ok', movement });
          else res.json({ message: 'fail', detail: 'no exercise' });
        })
        .catch(err => {
          res.send(err);
        });
    })

    // ===== PUT =======
    .put((req, res) => {
      Movement.findOne({ name: req.params.name })
        .exec()
        .then(movement => {
          if (req.body.name) movement.name = req.body.name;
          if (req.body.material) movement.material = req.body.material;
          if (req.body.muscles) movement.muscles = req.body.muscles;

          return movement.save();
        })
        .then(movement => {
          res.json({ message: 'ok', movement });
        })
        .catch(err => {
          res.send(err);
        });
    })

    // ===== DELETE =======
    .delete((req, res) => {
      Movement.remove({ name: req.params.name })
        .exec()
        .then(() => {
          res.json({ message: 'ok' });
        })
        .catch(err => {
          res.send(err);
        });
    });

  return apiRouter;
};
