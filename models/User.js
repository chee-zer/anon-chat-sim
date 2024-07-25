const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,

    sparse: true,

    lowercase: true,
    trim: true,
    validate: {
      validator: (v) => /^b\d{6}@iiit-bh.ac.in/gi.test(v),
    },
    message: "{VALUE} is not a valid college id.",
  },
  isVerified: {
    default: false,
    type: Boolean,
  },
  verificationToken: {
    type: String,
  },
  userCode: {
    type: String,
    unique: true,
    sparse: true,
    default: null,
  },
  isOnline: {
    type: Boolean,
    required: true,
    default: false,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
});

UserSchema.pre("save", function (next) {
  if (this.userCode == null) {
    this.userCode = undefined;
  }
  if (this.email == null) {
    this.email = undefined;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
