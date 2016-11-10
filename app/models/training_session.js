var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Exercise = require('./exercise');


var SessionSchema = new Schema({
  date: { type: Date, default: Date.now },
  time: Number, //Time in seconds
  user: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }]
});


SessionSchema.pre('remove', function (next) {
  var session = this;

  session.exercises.forEach(function (exercise) {
    Exercise.findByIdAndRemove(exercise).exec();
  })

  next();
});

module.exports = mongoose.model('Session', SessionSchema);
