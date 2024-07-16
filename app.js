const express = require("express");
const rateLimit = require("express-rate-limit");

const roomRouter = require("./routes/roomRoutes");
const verifyRouter = require("./routes/verifyRoutes");
const AppError = require("./utils/appError");

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //this is milliseconds so gotta convert it to soo
  max: 100, //no of req for each ip per windowMs
});

app.use(limiter);
app.use(express.json());
app.use("/verify", verifyRouter);
app.use("/rooms", roomRouter);

app.all("*", (res, req, next) => {
  next(new AppError(`Invalid url: ${req.url}`));
});

module.exports = app;
