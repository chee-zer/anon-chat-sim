const Room = require("../models/Room");
const AppError = require("../utils/appError");
const User = require("./../models/User");
const path = require("path");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.createRoom = catchAsync(async (req, res) => {
  const { name, userID } = req.body;
  const room = new Room({
    name,
    createdBy: userID,
  });

  await room.save();

  res.status(200).send(room);
});

exports.validateUserCode = catchAsync(async (req, res, next) => {
  const userCode = await User.findOne({ userCode: req.query.u });
  if (!userCode) return next(new AppError("Invalid or expired UserCode"));
  next();
});

exports.showRooms = catchAsync(async (req, res) => {
  const filePath = path.join(__dirname, "..", "public", "rooms.html");
  res.sendFile(filePath);
});
