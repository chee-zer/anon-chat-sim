const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });
const roomRouter = require("./routes/roomRoutes");
const router = require("./routes/whatdis");

const app = express();

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then((con) => {
    console.log(`DB connection successful!!`);
  })
  .catch((err) => console.log(err.message));

//Middlewares
app.use(express.json());
app.use("/", roomRouter);
app.use("/", router);

//start server
app.listen(3000, () => {
  console.log(`SERVER RUNNING YAYY`);
  console.log(process.env.PORT);
});
