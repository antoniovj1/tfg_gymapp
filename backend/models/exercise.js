const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Session = require('./training_session');


const ExerciseSchema = new Schema({
    session: {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    movement: {type: mongoose.Schema.Types.ObjectId, ref: 'Movement'},
    timestamp: {
        type: Date,
        default: Date.now
    },
    sets: [{
        repetitions: Number,
        weight: Number,
        rest: Number,
        timestamp: {type: Date, default: Date.now}
    }]
});


ExerciseSchema.pre('remove', function (next) {
    const exercise = this;
    const Session = require('./training_session');
    Session.findOneAndUpdate({ _id: exercise.session }, { $pull: { exercises: exercise._id }}).exec()
	.then((session) => {
		
	
	});

	next();
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
