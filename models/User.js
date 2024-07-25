const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,

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

UserSchema.pre("save", async function (next) {
  if (this.userCode == null) {
    this.userCode = undefined;
  }
  if (this.isNew && this.email) {
    try {
      const existingUser = await this.constructor.findOne({
        email: this.email,
      });
      if (existingUser) {
        await existingUser.deleteOne();
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
