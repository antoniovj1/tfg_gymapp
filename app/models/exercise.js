var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var ExerciseSchema   = new Schema({
	sesion: {type: mongoose.Schema.Types.ObjectId, ref: 'Sesion'},
	movement: {type: mongoose.Schema.Types.ObjectId, ref: 'Movement'},
  timestamp: {
        type: Date,
        default: Date.now
      }
});


module.exports = mongoose.model('Exercise', ExerciseSchema);
