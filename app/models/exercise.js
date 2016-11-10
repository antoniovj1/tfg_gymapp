var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Session = require('./training_session');



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


ExerciseSchema.pre('remove', function (next) {
	var exercise = this;
	var Session = require('./training_session');
	Session.findOneAndUpdate({ _id: exercise.session }, { $pull: { exercises: exercise._id }}).exec()
	.then(function(session){
		console.log(session);
		
	});

	next();
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
