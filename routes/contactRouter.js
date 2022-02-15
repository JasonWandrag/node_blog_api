const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config;

const app = express.Router();

app.get("/", (req, res) =>
  res.send({
    msg: "To send an email, send a POST request with a JSON object structured as follows:",
    email: {
      name: "John Doe",
      email: "johndoe@gmail.com",
      contact: "0123456789",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni assumenda eveniet fuga at possimus esse earum eos sit consequatur saepe, officiis vitae nisi neque vero natus adipisci dicta iure suscipit!",
    },
  })
);

app.post("/", (req, res) => {
  let { name, email, contact, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.USER,
    subject: "New Contact from your portfolio",
    html: `
<h1>${name} is interested in your services.</h1>
<p>Contact them on:</p>
<ul>
    <li><a href='tel:${contact}'>${contact}</a></li>
    <li><a href='mailto:${email}'>${email}</a></li>
</ul> 
<p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send({
        msg: `Email not sent
      
      ${error}  `,
      });
    } else {
      console.log("Email sent: " + info.response);
      res.send({ msg: "Email has been sent successfully" });
    }
  });
});

module.exports = app;
