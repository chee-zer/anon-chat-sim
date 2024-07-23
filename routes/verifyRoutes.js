const express = require("express");
const crypto = require("crypto");
const path = require("path");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const User = require("../models/User"); //the model has to start with a capital letter(?) FORGORFORGOR REPLACE ASAP

const verifyRouter = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const sendMail = catchAsync(async (email, verificationToken) => {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      type: "OAuth2",
      user: process.env.USER,
      pass: process.env.PASS,
      clientId: CLIENT_ID,
      refreshToken: REFRESH_TOKEN,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  //mail config, from, to, contents, attachements yada yada ref to nodemailer site
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Email verification for Anon Chat",
    text: `Click on this link to verify your id: http://localhost:${process.env.PORT}/verify/${verificationToken}`,
  };

  //does the uh transporting :)
  transporter.sendMail(mailOptions);
});

//verify route, users will post their email id here
verifyRouter.post(
  "/",
  catchAsync(async (req, res) => {
    const { email } = req.body;
    const verificationToken = crypto.randomBytes(32).toString("hex");
    console.log(`here`);
    const user = new User({
      email: email, //according to es6, you can just write email and it'll work cuz the key and value are same ref to object destructuring retard
      verificationToken: verificationToken,
      isVerified: false,
    });
    await user.save();

    await sendMail(email, verificationToken);
    res.status(200).send("email verified successfully");
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
    user.email = undefined;

    await user.save();
    window.close;

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
