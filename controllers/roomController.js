const Room = require("../models/Room");

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

roomRouter.get(
  "/rooms",
  catchAsync(async (req, res) => {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  })
);
