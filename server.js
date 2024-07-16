const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });

const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log(`\u001b[31mUNCAUGHT EXCEPTION, SHUTTING DOWN APP...\u001b[0m`);
  console.log(`${err.name}: ${err.message}`);
  process.exit(1);
});

//connect to DB
mongoose.connect(`${process.env.MONGODB_URI}`).then((con) => {
  console.log(`DB connection successful!!`);
});

//start server
const server = app.listen(3000, () => {
  console.log(`SERVER RUNNING ON PORT ${3000}`);
  console.log(`RUNNING IN ${process.env.NODE_ENV} mode`);
});

process.on("unhandledRejection", (err) => {
  console.log(`\u001b[31mUNHANDLED REJECTION, SHUTTING DOWN APP...\u001b[0m`);
  console.log(`${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
