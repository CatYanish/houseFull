var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var username = process.env.USER_NAME || require('../modules/mail.config.js').username;
var password = process.env.PASS || require('../modules/mail.config.js').password;

// handle the route at yourdomain.com/sayHello
router.post('/', function(req, res, next) {
  console.log('post /register route');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: username,
      pass: password
    }
  });

  var mailOptions = {
    from: 'catyanish@gmail.com',
    to: 'catyanish@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



}); //end of create user post req.






module.exports = router;
