const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv").config({ path: "./config.env" });
const { Server } = require("socket.io");
const { socketSetup } = require("./socket");

const app = require("./app");

const server = http.createServer(app);
const io = new Server(server);

process.on("uncaughtException", (err) => {
  console.log(`\u001b[31mUNCAUGHT EXCEPTION, SHUTTING DOWN APP...\u001b[0m`);
  console.log(`${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

//connect to DB
mongoose.connect(`${process.env.MONGODB_URI}`).then((con) => {
  console.log(`DB connection successful!!`);
});

//start server
server.listen(3000, () => {
  console.log(`SERVER RUNNING ON PORT ${3000}`);
  console.log(`RUNNING IN ${process.env.NODE_ENV} mode`);
});

socketSetup(io);

process.on("unhandledRejection", (err) => {
  console.log(`\u001b[31mUNHANDLED REJECTION, SHUTTING DOWN APP...\u001b[0m`);
  console.log(`${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
