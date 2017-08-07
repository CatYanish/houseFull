var express = require('express');
var router = express.Router();
var Task = require('../models/task.schema.js');
var path = require('path');

//WORKING HERE, need to make a post route with authentication. Both examples below are
//for syntax reference only and don't function here.


// Handles Ajax request for user information if user is authenticated
router.post('/', function(req, res) {
  console.log('post /task route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in at post task route');
    var taskToSave = {
      username : req.body.username,
      houseName: req.body.houseName,
      room: req.body.room,
      time: req.body.time,
      date: req.body.date,
      description: req.body.description
    };
    console.log('object to save to db', taskToSave);

    Task.create(taskToSave, function(err, post) {
      console.log('post /task -- task.create');
         if(err) {
           console.log('post / task -- task.create -- failure');
           next(err);
         } else {
           console.log('post /task -- task.create -- success');
          res.redirect('/');
         }
    })
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});



// router.post('/', function(req, res, next) {
//   console.log('post /register route');
//   /*
//   username: {type: String, required: true, index: {unique: true}},
//   password: {type: String, required: true},
//   recipes: {type: Array}
//   */
//     var userToSave = {
//       username : req.body.username,
//       password : req.body.password,
//       houseName: req.body.houseName
//     };
//
//
//     Users.create(userToSave, function(err, post) {
//       console.log('post /register -- User.create');
//          if(err) {
//            console.log('post /register -- User.create -- failure');
//            // next() here would continue on and route to routes/index.js
//            next(err);
//          } else {
//            console.log('post /register -- User.create -- success');
//           // route a new express request for GET '/'
//           res.redirect('/');
//          }
//     });
// });



module.exports = router;
