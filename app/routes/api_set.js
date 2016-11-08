var bodyParser = require('body-parser');
var Exercise = require('../models/exercise');
var Session = require('../models/training_session');
var Movement = require('../models/movement');
var config = require('../../config');



module.exports = function (app, express) {

    var apiRouter = express.Router();
    // /training/set/:id_exercise
    // -------------------
    apiRouter.route('/training/set/:id_exercise')

        // ===== POST =======
        .post(function (req, res) {
            Exercise.findById(req.params.id_exercise).exec()
                .then(function (exercise) {
                    var s = { 'repetitions': req.body.repetitions, 'weight': req.body.weight, 'rest': req.body.rest };
                    exercise.sets.push(s);
                    
                    return exercise.save();
                })
                .then(function () {
                    res.json({ message: 'ok' });
                })
                .catch(function (err) {
                    res.send(err);
                })
        })

        // ===== GET =======
        .get(function (req, res) {
            Exercise.findById(req.params.id_exercise).select('sets').exec()
                .then(function (sets) {
                    res.json({ message: 'ok', sets });
                })
                .catch(function (err) {
                    res.send(err);
                })
        })

    // /training/set/byId/:id_set
    // -------------------
    apiRouter.route('/training/set/:id_exercise/:num')

        // ===== GET =======
        .get(function (req, res) {
            Exercise.findById(req.params.id_exercise)
                .slice('sets', [parseInt(req.params.num), 1])
                .exec()
                .then(function (set) {
                    set = set['sets'][0] ;
                    
                    res.json({ message: 'ok', set });
                })
                .catch(function (err) {
                    res.send(err);
                })
        })

        // ===== PUT =======
        .put(function (req, res) {
            var rep = "sets." + req.params.num + ".repetitions";
            var weight = "sets." + req.params.num + ".weight";
            var rest = "sets." + req.params.num + ".rest";

            var query = {};

            if (req.body.weight)
                query[weight] = parseFloat(req.body.weight);
            if (req.body.rest)
                query[rest] = parseFloat(req.body.rest);
            if (req.body.repetitions)
                query[rep] = parseFloat(req.body.repetitions);


            Exercise.update({ _id: req.params.id_exercise }, { $set: query }).exec()
                .then(function () {
                    res.json({ message: 'ok' });
                })
                .catch(function (err) {
                    res.send(err);
                })
        })

        // ===== DELETE =======
        .delete(function (req, res) {
            var set = 'sets.' + req.params.num;

            var query = {};
            query[set] = 1;

            Exercise.update({ _id: req.params.id_exercise }, { $unset: query }).exec()
                .then(function () {
                    return Exercise.update({ _id: req.params.id_exercise }, { $pull: { sets: null } }).exec();
                })
                .then(function () {
                    res.json({ message: 'ok' });
                })
                .catch(function (err) {
                    res.send(err);
                })
        });

    return apiRouter;
};
