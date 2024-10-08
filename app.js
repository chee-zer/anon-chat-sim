const express = require("express");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const path = require("path");

const roomRouter = require("./routes/roomRoutes");
const verifyRouter = require("./routes/verifyRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //this is milliseconds so gotta convert it to soo
  max: 100, //no of req for each ip per windowMs
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(xss());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "frontpage.html"));
});
app.use("/verify", verifyRouter);

app.use("/rooms", roomRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Invalid url: ${req.url}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
