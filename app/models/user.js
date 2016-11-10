var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Session = require('./training_session');

// user schema
var UserSchema = new Schema({
	name: String,
	birthday: Date,
	height: Number,
	weight: Number,
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true, select: false },
	sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
	role: {
		type: String,
		enum: ['Admin', 'Basic'],
		default: 'Basic'
	}
});

UserSchema.pre('save', function (next) {
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function (err, hash) {
		if (err) return next(err);

		user.password = hash;
		next();
	});
});


UserSchema.pre('delete', function (next) {
	var user = this;

	user.sessions.forEach(function (session) {
		Session.findById(session).exec()
		.then(function(session){
			session.remove();
		})
		.catch(function(err){
			return err;
		})
	})
	next();
});


UserSchema.methods.comparePassword = function (password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
