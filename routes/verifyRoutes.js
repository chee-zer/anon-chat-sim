const express = require("express");
const crypto = require("crypto");
const path = require("path");
const nodemailer = require("nodemailer");
const User = require("../models/User"); //the model has to start with a capital letter(?) FORGORFORGOR REPLACE ASAP

const verifyRouter = express.Router();

//dunno what this does but its there in the sample code of nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

//verify route, users will post their email id here
verifyRouter.post(
  "/",
  catchAsync(async (req, res) => {
    const { email } = req.body;
    const verficationToken = crypto.randomBytes(32).toString("hex");
    console.log(`here`);
    const user = new User({
      email: email, //according to es6, you can just write email and it'll work cuz the key and value are same ref to object destructuring retard
      verificationToken: verficationToken,
      isVerified: false,
    });
    await user.save();

    //mail config, from, to, contents, attachements yada yada ref to nodemailer site
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Email verification for Anon Chat",
      text: `Click on this link to verify your id: http://localhost:${process.env.PORT}/verify/${verficationToken}`,
    };

    //does the uh transporting :)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.toString());
      } else {
        res.status(200).send("Verification Email Sent");
      }
    });
  })
);

verifyRouter.get(
  "/:token",
  catchAsync(async (req, res) => {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) {
      res.status(404).send("Invalid Token");
    }

    user.isVerified = true;
    user.verficationToken = undefined; //deleting the token so that it becomes invalid

    await user.save();

    res.status(200).send("Email verified successfully");
  })
);

verifyRouter.get(
  "/",
  catchAsync(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "verify.html"));
  })
);

module.exports = verifyRouter;
