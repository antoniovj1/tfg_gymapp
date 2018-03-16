const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Session = require("./training_session");

// user schema
const UserSchema = new Schema({
  auth0id: { type: String, required: true, index: { unique: true } },
  name: String,
  birthday: Date,
  height: Number,
  weight: Number,

  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  role: {
    type: String,
    enum: ["Admin", "Basic"],
    default: "Basic"
  }
});

UserSchema.pre("delete", function(next) {
  const user = this;

  user.sessions.forEach(session => {
    Session.findById(session)
      .exec()
      .then(session => {
        session.remove();
      })
      .catch(err => err);
  });
  next();
});

module.exports = mongoose.model("User", UserSchema);