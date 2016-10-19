var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SessionSchema   = new Schema({
  date: {type: Date, default: Date.now },
  time: Number, //Time in seconds
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

});


module.exports = mongoose.model('Session', SessionSchema);
