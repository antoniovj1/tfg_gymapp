var bodyParser = require('body-parser');
var Set	 = require('../models/set');
var config     = require('../../config');


module.exports = function(app, express) {

  var apiRouter = express.Router();

  apiRouter.route('/training/set/:id_exercise')
  // ===== POST =======
  .post(function(req, res){

    var set = new Set();

    set.repetitions = req.body.repetitions;
    set.weight = req.body.weight;
    set.rest = req.body.rest;
    set.exercise = req.params.id_exercise;


    set.save(function(err) {
      if (err) return res.send(err);

      res.json({ message: 'ok' });
    });
  })

  // ===== GET =======
  .get(function(req, res) {
    Set.find({exercise:req.params.id_exercise}, function(err, set) {
      if (err) res.send(err);
      res.json(set);
    });
  })

  apiRouter.route('/training/set/byId/:id_set')
  // ===== GET =======
  .get(function(req, res) {
    Set.findById(req.params.id_set, function(err, set) {
      if (err) res.send(err);
      res.json(set);
    });
  })

  // ===== PUT =======
  .put(function(req, res) {
    Set.findById(req.params.id_set, function(err, set) {

      if (err)
        return res.send(err);

      if (req.body.weight) set.weight = req.body.weight;
      if (req.body.rest) set.rest = req.body.rest;
      if (req.body.repetitions) set.repetitions = req.body.repetitions;

      set.save(function(err, set) {
        if (err) res.send(err);
        res.json({ message: 'ok', set });
      });

    });
  })

  // ===== DELETE =======
  .delete(function(req, res) {
    Set.remove({_id:req.params.id_set }, function(err, set) {
      if (err) res.send(err);
      res.json({ message: 'ok' });
    });
  });

  return apiRouter;
};
