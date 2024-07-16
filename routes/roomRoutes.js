//didnt bother creating separate controllers and routes files, since there are like 4 routes

const Room = require("../models/Room");
const express = require("express");

const roomRouter = express.Router();

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(res, req, next).catch(next);
  };
};

const fixedRooms = ["programming", "art", "music", "maths", "shitposting"];
fixedRooms.forEach(
  catchAsync(async (roomName) => {
    const room = new Room({ name: roomName });
    await room.save();
  })
);

roomRouter.post(
  "/rooms",
  catchAsync(async (req, res) => {
    const { name, userID } = req.body;
    const room = new Room({
      name,
      createdBy: userID,
    });

    await room.save();

    res.status(200).send(room);
  })
);

roomRouter.get(
  "/rooms",
  catchAsync(async (req, res) => {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  })
);

module.exports = roomRouter;
