const Room = require("../models/Room");
const AppError = require("../utils/appError");
const User = require("./../models/User");
const { path } = require("path");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(res, req, next).catch(next);
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
});

exports.showRooms = catchAsync(async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "public", "rooms.html"));
});
