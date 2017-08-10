var express = require('express');
var router = express.Router();
var House = require('../models/house.schema.js');
var path = require('path');
var mongoose = require('mongoose');

//WORKING HERE, need to make a post route with authentication. Both examples below are
//for syntax reference only and don't function here.


router.put('/', function(req, res) {
  console.log('house info to find and update member: ', req.body.code);
  console.log('house info to find: ', req.body.houseName);

  if(req.isAuthenticated()) {

    var taskToSave = {
      username : req.body.username,
      userId: req.user._id,
      room: req.body.room,
      time: req.body.time,
      date: req.body.date,
      description: req.body.description
    };


  House.update({ houseName: req.body.houseName, code: req.body.code},
    { $push: { tasks: taskToSave}},
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






router.get('/', function(req, res) {

  if(req.isAuthenticated()) {
    var userId = mongoose.Types.ObjectId(req.user._id);
    console.log(userId);
    House.find({ members: userId}).then(function(response) {
      console.log('all of everything in the house', response[0]);
      console.log('the tasks in the house', response[0].tasks);
      var taskList = response[0].tasks;
      res.send(taskList);

   })
 }  else {
   // failure best handled on the server. do redirect here.
   console.log('not logged in');
   // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
   res.send(false);
 }
});









module.exports = router;
