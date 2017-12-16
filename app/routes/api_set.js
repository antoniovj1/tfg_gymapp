const bodyParser = require('body-parser');
const Exercise = require('../models/exercise');
const Session = require('../models/training_session');
const Movement = require('../models/movement');
const config = require('../../config');


module.exports = function (app, express) {

    const apiRouter = express.Router();
    // /training/exercise/:id_exercise/set
    // -------------------
    apiRouter.route('/training/exercise/:id_exercise/set')

        // ===== POST =======
        .post(function (req, res) {
            Exercise.findById(req.params.id_exercise).exec()
                .then(function (exercise) {
                    const s = {'repetitions': req.body.repetitions, 'weight': req.body.weight, 'rest': req.body.rest};
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
        });

    // /training/exercise/:id_exercise/set/:num
    // -------------------
    apiRouter.route('/training/exercise/:id_exercise/set/:num')

        // ===== GET =======
        .get(function (req, res) {
            Exercise.findById(req.params.id_exercise)
                .slice('sets', [parseInt(req.params.num), 1])
                .exec()
                .then(function (set) {
                    set = set['sets'][0];

                    res.json({ message: 'ok', set });
                })
                .catch(function (err) {
                    res.send(err);
                })
        })

        // ===== PUT =======
        .put(function (req, res) {
            const rep = "sets." + req.params.num + ".repetitions";
            const weight = "sets." + req.params.num + ".weight";
            const rest = "sets." + req.params.num + ".rest";

            const query = {};

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
            const set = 'sets.' + req.params.num;

            const query = {};
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
