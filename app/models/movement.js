var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var MovementSchema   = new Schema({
	name: { type: String, required: true},
  material: String,
  muscles : [{
    name : String,
    percentage : Number
     }]
});


module.exports = mongoose.model('Movement', MovementSchema);
