const Room = require("../models/Room");
const express = require("express");

const roomRouter = express.Router();

const fixedRooms = ["programming", "art", "music", "maths", "shitposting"];
fixedRooms.forEach(
  catchAsync(async (roomName) => {
    const room = new Room({ name: roomName });
    await room.save();
  })
);

module.exports = roomRouter;
