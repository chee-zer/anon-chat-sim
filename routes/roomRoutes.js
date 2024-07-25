const Room = require("../models/Room");
const express = require("express");
const roomController = require("./../controllers/roomController");

const roomRouter = express.Router();

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const createFixedRooms = async () => {
  const fixedRooms = ["programming", "art", "music", "maths", "shitposting"];

  for (const roomName of fixedRooms) {
    const existingRoom = await Room.findOne({ name: roomName });
    if (!existingRoom) {
      const room = new Room({ name: roomName });
      await room.save();
    }
  }
};

createFixedRooms().catch((err) =>
  console.error("Error creating fixed rooms:", err)
);

roomRouter
  .route("/")
  .get(roomController.validateUserCode, roomController.showRooms);

module.exports = roomRouter;
