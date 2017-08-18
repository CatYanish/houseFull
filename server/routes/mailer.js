var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var username = process.env.USER_NAME || require('../modules/mail.config.js').username;
var password = process.env.PASS || require('../modules/mail.config.js').password;

// handle the route at yourdomain.com/sayHello
router.post('/', function(req, res, next) {
  console.log('house name from req body', req.body.houseName);
  console.log('house code from req body', req.body.code);
  console.log('email address from req body', req.body.email);
  console.log('post /register route');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: username,
      pass: password
    }
  });

  var mailOptions = {
    from: 'housefull.antares@gmail.com',
    to: req.body.email,
    subject: 'You\'re Invited to Join the HouseFull App!',
    text: 'Create an account and then join your house with this house name ' + req.body.houseName + ' and this code ' + req.body.code + '. Happy housing!'
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
