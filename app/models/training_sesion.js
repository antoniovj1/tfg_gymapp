var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SesionSchema   = new Schema({
  date: {
        type: Date,
        default: Date.now
      }  material: { type: String, required: true},
  time: Number, //Time in seconds
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

});


module.exports = mongoose.model('Movement', MovementSchema);
