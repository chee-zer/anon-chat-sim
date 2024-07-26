const Room = require("../models/Room");
const express = require("express");
const roomController = require("./../controllers/roomController");

const roomRouter = express.Router();

roomRouter
  .route("/")
  .get(roomController.validateUserCode, roomController.showRooms);

module.exports = roomRouter;
