var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var SetSchema   = new Schema({
	repetitions: Number,
  weight: Number,
  rest: Number,
  timestamp: {
        type: Date,
        default: Date.now
      },
	exercise : {type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}

});


module.exports = mongoose.model('Set', SetSchema);
