var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var MovementSchema   = new Schema({
	name:  { type: String, required: true, index: true, unique: true },
  material:{ type: String, required: true},
  muscles : [{ name : { type: String, required: true},
    					 percentage : { type: Number, required: true}
             }]
});


module.exports = mongoose.model('Movement', MovementSchema);
