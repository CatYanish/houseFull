var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var Cred = require('../modules/mail.config.js')
var passport = require('passport');
var path = require('path');



// handle the route at yourdomain.com/sayHello
router.post('/', function(req, res, next) {
  console.log('post /register route');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: Cred.username,
      pass: Cred.password
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







var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'catyanish@gmail.com',
    pass: '11Piggies22'
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


module.exports = router;
