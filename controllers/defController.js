const express = require("express");
const { randomBytes } = require("crypto");
const User = require("./../models/User");
const AppError = require("./../utils/appError");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(res, req, next).catch(next);
  };
};

exports.validateEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user.isVerified) return new AppError("Email isnt verified", 401);
});

//gets the email id, username and sets usercode
exports.setUsername = catchAsync(async (res, req, next) => {
  const userCode = crypto.randomBytes(16).toString("hex"); //i could consider the possibility of two same codes being generated and causing a validation error that leaves the user confused, but no one will use this app and making a database call to check every codes seems to be way unfair of a tradeoff so i will not add a retry functionality here. Also i am lazy. Also no one will probably ever read this comment. If you did, why? do you have nothing better to do?
  const { email, username } = req.body;
  const user = await User.findOne({ email });
  user.username = username;
  user.userCode = userCode;
  await user.save;

  res.redirect("/rooms?u=${userCode}");
});
