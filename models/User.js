const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
  },
  userCode: {
    type: String,
    unique: true,
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
  avatar: {
    type: String,
    default: "default_avatar.png",
  },
});

module.exports = mongoose.model("User", UserSchema);
