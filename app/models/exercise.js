var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ExerciseSchema = new Schema({
	session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
	movement: { type: mongoose.Schema.Types.ObjectId, ref: 'Movement' },
	timestamp: {
		type: Date,
		default: Date.now
	},
	sets: [{
		repetitions: Number,
		weight: Number,
		rest: Number,
		timestamp: { type: Date, default: Date.now }
				}]
});


module.exports = mongoose.model('Exercise', ExerciseSchema);
