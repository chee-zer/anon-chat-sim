const Room = require("../models/Room");
const express = require("express");
const roomController = require("./../controllers/roomController");

const roomRouter = express.Router();

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const fixedRooms = ["programming", "art", "music", "maths", "shitposting"];
fixedRooms.forEach(
  catchAsync(async (roomName) => {
    const room = new Room({ name: roomName });
    await room.save();
  })
);

roomRouter
  .route("/")
  .get(roomController.validateUserCode, roomController.showRooms);

module.exports = roomRouter;
