const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Exercise = require('./exercise');


const SessionSchema = new Schema({
    date: {type: Date, default: Date.now},
    time: Number, // Time in seconds
    user: {required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}]
});


SessionSchema.pre('remove', function (next) {
    const session = this;

    session.exercises.forEach((exercise) => {
    Exercise.findByIdAndRemove(exercise).exec();
  });

  next();
});

module.exports = mongoose.model('Session', SessionSchema);
