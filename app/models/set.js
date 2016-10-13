var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var SetSchema   = new Schema({
	repetitions: Number,
  weight: Number,
  rest: Number,
  timestamp: {
        type: Date,
        default: Date.now
      }
});


module.exports = mongoose.model('Set', SetSchema);
