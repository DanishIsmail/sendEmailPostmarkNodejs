const express = require("express"),
  crypto = require("crypto"),
  postmark = require("postmark");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isPayLoad = (req, res, next) => {
  if (req.body?.email) {
    console.log("here");
    next();
  } else {
    return res.status(404).send("plese provide valid payload");
  }
};

// Example request
var client = new postmark.ServerClient("sever token");
const resetUrl = `http://localhost:3000/forgot`;
const message = `
    <h1>Hi</h1>
    <p>you are recieving this email because  (you or someone else) has reuqested the reset of the password.</p>
    <p>Please click this link to reset your password</p><a href=${resetUrl}>${resetUrl}</a><br><br>
    <p>if you did'nt request reset password,please ignore this email or reply us to let us know.</p> <br>
    <p>Thanks</p>
    <h2>Danish</h2>
    <p>Contact us through email</p>
`;
app.post("/api/sendEmailWithPostmark", isPayLoad, async (req, res) => {
  console.log("in controller");
  client.sendEmail({
    From: "sender@example.com", //email without gmail, yahoo domain
    To: "receiver@example.com", //email with same domain as sender
    Subject: "RESET PASSWORD",
    HtmlBody: message,
  });
  return res.send("email send to user");
});

const port = process.env.PORT || 8000;
app.listen(port, console.log(`running on port ${port}`));
