var bodyParser = require('body-parser');
var Movement	 = require('../models/movement');
var config     = require('../../config');


module.exports = function(app, express) {

  var apiRouter = express.Router();
  /***********************************/
  // Movement
  // ----------------------------------------------------
  apiRouter.route('/training/movements')
  .post(function(req, res) {

    /*
    {
    "name":"Dominadas",
    "material": "Barra",
    "muscles":[{"name":"bicep","percentage":20},
               {"name":"pecho","percentage":10},
               {"name":"dorsal","percentage":60},
               {"name":"abdominales","percentage":10}]
  }
  */

  var movement = new Movement(req.body);

  movement.save(function(err, movement) {
    if (err) {
     if (err.code == 11000)
       return res.json({ success: false, message: 'A movement with that name already exists. '});
      else
        return res.send(err);
    }

    res.json({ message: 'ok' ,movement });
  });

})

.get(function(req, res) {

  Movement.find({}, function(err, movements) {
    if (err) res.send(err);

    res.json(movements);
  });
});


apiRouter.route('/training/movements/:name')

.get(function(req, res) {
  Movement.find({name:req.params.name}, function(err, movement) {
    if (err) res.send(err);

    res.json(movement);
  });
})

.put(function(req, res) {
  Movement.findOne({name:req.params.name}, function(err, movement) {

    if (movement.length == 0)
      return res.json({ success: false, message: 'fail'});
    if (err)
      return res.send(err);

    if (req.body.name) movement.name = req.body.name;
    if (req.body.material) movement.material = req.body.material;
    if (req.body.muscles) movement.muscles = req.body.muscles;

    movement.save(function(err, movement) {
      if (err) res.send(err);
      res.json({ message: 'ok', movement});
    });

  });
})

.delete(function(req, res) {
  Movement.remove({	name:req.params.name }, function(err, user) {
    if (err) res.send(err);
    res.json({ message: 'ok' });
  });
});
/**********************************/
return apiRouter;
};
