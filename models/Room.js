const mongoose = require("mongoose");
const User = require("./User");

const RoomSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  name: {
    type: String,
    required: true,
  },
  inviteCode: {
    type: String,
    unique: true,
  },
  userCodes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      code: {
        type: String,
        unique: true,
      },
    },
  ],
});

module.exports = mongoose.model("Room", RoomSchema);
