var express = require('express');
var router = express.Router();
var Users = require('../models/user.js');
var path = require('path');
var House = require('../models/house.schema.js');


// Handles request for HTML file
router.get('/', function(req, res, next) {
  console.log('get /register route');
  res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
router.post('/', function(req, res, next) {
  console.log('post /register route');

  var userToSave = {
    username : req.body.username,
    password : req.body.password,
  };

  Users.create(userToSave, function(err, post) {
    console.log('post /register -- User.create');
    if(err) {
      console.log('post /register -- User.create -- failure');
      next(err);
    } else {
      console.log('post /register -- User.create -- success');
      res.redirect('/');
    }
  });
}); //end of create user post req.



router.post('/house', function(req, res, next) {
  console.log('post /register/house route');

  if(req.isAuthenticated()) {
    console.log('req.user._id', req.user._id);

    var houseToSave = {
      houseName: req.body.houseName,
      code: req.body.code,
      members: [req.user._id]
    };

    House.create(houseToSave, function(err, post) {
      console.log('post /register/house -- house to create', houseToSave);
      if(err) {
        console.log('post /register -- User.create -- failure');
        next(err);
      } else {
        console.log('post /register -- User.create -- success');
        res.redirect('/');
      }
    });
  } else {
    console.log('not logged in');
    res.send(false);
  }
}); //end of post function



////put to add another member to a house

router.put('/join', function(req, res) {
  console.log('house info to find and update member: ', req.body.code);
  console.log('house info to find: ', req.body.houseName);

  if(req.isAuthenticated()) {

    House.update({ houseName: req.body.houseName, code: req.body.code},
      { $push: { members: req.user._id}},
      function(err, data) {
        if(err) {
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      })
    }  else {
      // failure best handled on the server. do redirect here.
      console.log('not logged in');
      // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
      res.send(false);
    }


  }); //end put function


  module.exports = router;
