var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SesionSchema   = new Schema({
  date: {type: Date, default: Date.now },
  time: Number, //Time in seconds
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

});


module.exports = mongoose.model('Sesion', SesionSchema);
