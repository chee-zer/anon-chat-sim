const express = require("express");

const roomRouter = require("./routes/roomRoutes");
const verifyRouter = require("./routes/verifyRoutes");

const app = express();

app.use(express.json());
app.use("/verify", verifyRouter);
app.use("/rooms", roomRouter);

module.exports = app;
