const Room = require("./models/Room");
const express = require("express");

const roomRouter = express.Router();

const fixedRooms = ["programming", "art", "music", "maths", "shitposting"];
fixedRooms.forEach(async (roomName) => {
  const room = new Room({ name: roomName });
  await room.save();
});

roomRouter.post("/rooms", async (req, res) => {
  const { name, userID } = req.body;
  const room = new Room({
    name,
    createdBy: userID,
  });

  await room.save();

  res.status(200).send(room);
});

roomRouter.get("/rooms", async (req, res) => {
  const rooms = await Room.find();
  res.status(200).send(rooms);
});

module.exports = roomRouter;
