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
});

module.exports = mongoose.model("Room", RoomSchema);
