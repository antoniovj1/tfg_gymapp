const mongoose = require('mongoose');

const { Schema } = mongoose;
const Session = require('./training_session');

const ExerciseSchema = new Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  movement: { type: mongoose.Schema.Types.ObjectId, ref: 'Movement' },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sets: [
    {
      repetitions: Number,
      weight: Number,
      rest: Number,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

ExerciseSchema.pre('remove', function(next) {
  const exercise = this;
  Session.findOneAndUpdate({ _id: exercise.session }, { $pull: { exercises: exercise._id } })
    .exec()
    .then();

  next();
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
