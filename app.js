const express = require("express");

const roomRouter = require("./routes/roomRoutes");
const verifyRouter = require("./routes/verifyRoutes");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());
app.use("/verify", verifyRouter);
app.use("/rooms", roomRouter);

app.all("*", (res, req, next) => {
  next(new AppError(`Invalid url: ${req.url}`));
});

module.exports = app;
