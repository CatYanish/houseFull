var express = require('express');
var router = express.Router();
var House = require('../models/house.schema.js');
var path = require('path');
var mongoose = require('mongoose');


//add a task to the house list
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
  console.log('not logged in');
  // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
  res.send(false);
}

}); //end put function





//this route is intermittently super super slow//
router.get('/', function(req, res) {
console.log('in the get all tasks route, checking authentication');
  if(req.isAuthenticated()) {
    console.log('in the get all tasks route, checking what is slow');
    var userId = mongoose.Types.ObjectId(req.user._id);
    House.findOne({ members: userId}).then(function(foundHouse) {
          //console.log('all of everything in the house', foundHouse);
          console.log('number of tasks in the house', foundHouse.tasks.length);
          var taskList = foundHouse.tasks;
          res.send(taskList);

       }).catch(function(err){
         console.log('Error with find');
         res.send(500);
       })
 }  else {
   // failure best handled on the server. do redirect here.
   console.log('not logged in');
   // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
   res.send(false);
 }
});









module.exports = router;
