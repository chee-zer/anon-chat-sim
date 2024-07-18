const crypto = require("crypto");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`A user connected`);
  });

  socket.on("join room", (roomName) => {
    socket.join(roomName);
    io.to(roomName).emit();
  });
};
