var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var ExerciseSchema   = new Schema({
	movement: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movement'}],
  sets : [[{type: mongoose.Schema.Types.ObjectId, ref: 'Set'}]],
  timestamp: {
        type: Date,
        default: Date.now
      }
});


module.exports = mongoose.model('Movement', MovementSchema);
