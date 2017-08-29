var express = require('express');
var router = express.Router();
var House = require('../models/house.schema.js');
var mongoose = require('mongoose');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username
    };
    //Search all houses to see if user is present in member array
    var userId = mongoose.Types.ObjectId(req.user._id);
    console.log(userId);
    House.find({ members: userId}).then(function(response) {
      console.log('Looking for a house.');
      console.log('doc',response);
      if(response[0] !== undefined ) {
        console.log('they have a house');
        userInfo.houseName = response[0].houseName;
        userInfo.code = response[0].code;
        console.log(userInfo);
        res.send(userInfo);
      } else {
        console.log('They have no house');
        console.log('user without house', userInfo);
        res.send(userInfo);
      }
    }).catch(function(err){
      console.log('error',err);
    }); //end of login and check if user has house function
  } else {
    console.log('not logged in');
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});


module.exports = router;
