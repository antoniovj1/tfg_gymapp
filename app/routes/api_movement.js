const bodyParser = require('body-parser');
const Movement = require('../models/movement');
const config = require('../../config');


module.exports = function (app, express) {

    const apiRouter = express.Router();

    // /training/movements
    // -------------------
    apiRouter.route('/training/movements')

        // ===== POST =======
        .post(function (req, res) {
            /*{
              "name":"Dominadas",
              "material": "Barra",
              "muscles":[{"name":"bicep","percentage":20},
                         {"name":"pecho","percentage":10},
                         {"name":"dorsal","percentage":60},
                         {"name":"abdominales","percentage":10}]
                }*/

            const movement = new Movement(req.body);

            movement.save()
                .then(function (movement) {
                    res.json({ message: 'ok', movement });
                })
                .catch(function (err) {
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'A movement with that name already exists. ' });
                    else
                        return res.send(err);
                })
        })

        // ===== GET =======
        .get(function (req, res) {
            Movement.find({}).exec()
                .then(function (movements) {
                    res.json(movements);
                })
                .catch(function (err) {
                    res.send(err);
                })
        });

    // /training/movementsname
    // -------------------
    apiRouter.route('/training/movementsname')
        // ===== GET =======
        .get(function (req, res) {
            Movement.find({}).select('name -_id').exec()
                .then(function (movements) {
                    res.json(movements);
                })
                .catch(function (err) {
                    res.send(err);
                })
        });

    // /training/movements/:name
    // -------------------
    apiRouter.route('/training/movements/:name')
        // ===== GET =======
        .get(function (req, res) {
            Movement.findOne({ name: req.params.name }).exec()
                .then(function (movement) {                                        
                    if ( movement)
                        res.json({ message: 'ok', movement });
                    else 
                        res.json({ message: 'fail', detail: 'no exercise' });
                })
                .catch(function (err) {
                    res.send(err);
                })
        })

        // ===== PUT =======
        .put(function (req, res) {
            Movement.findOne({ name: req.params.name }).exec()
                .then(function (movement) {
                    if (req.body.name) movement.name = req.body.name;
                    if (req.body.material) movement.material = req.body.material;
                    if (req.body.muscles) movement.muscles = req.body.muscles;

                    return movement.save();
                })
                .then(function (movement) {
                    res.json({ message: 'ok', movement });

                })
                .catch(function (err) {
                    res.send(err);
                })
        })

        // ===== DELETE =======
        .delete(function (req, res) {
            Movement.remove({ name: req.params.name }).exec()
                .then(function () {
                    res.json({ message: 'ok' });
                })
                .catch(function (err) {
                    res.send(err);
                })
        });

    return apiRouter;
};
