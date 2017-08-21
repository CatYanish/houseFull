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

    var noteToSave = {
      username : req.body.username,
      userId: req.user._id,
      category: req.body.room,
      body: req.body.body,
      icon: req.body.icon,
      color: req.body.color
    };


  House.update({ houseName: req.body.houseName, code: req.body.code},
    { $push: { notes: noteToSave}},
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




//this route sends a list of all the tasks completed in the house//
router.get('/', function(req, res) {
  if(req.isAuthenticated()) {
    console.log('in the get all notes route');
    var userId = mongoose.Types.ObjectId(req.user._id);
    House.aggregate([
          { $match: { // Limit search to a specific house
               members: userId
          }},
          { $unwind: "$notes" },
          { $sort: { "notes.date": -1 } },
          { $limit: 50 }
           // Flattens the array of tasks to make grouping easier
        ]).then(function(foundNotes) {
          //console.log('all of everything in the house', foundHouse);
          console.log('this is foundhouse response', foundNotes);

          var noteList = [];


          for (var i = 0; i < foundNotes.length; i++) {
            console.log('this is foundNotes[i].notes', foundNotes[i].notes);
              var notes = foundNotes[i].notes;
              noteList.push(notes);
          }

          console.log('here is the array I want to push to', noteList);
          res.send(noteList);

       }).catch(function(err){
         console.log('Error with find', err);
         res.sendStatus(500);
       })
 }  else {
   // failure best handled on the server. do redirect here.
   console.log('not logged in');
   // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
   res.send(false);
 }
});



router.delete('/:id', function(req, res) {
  console.log('DELETE WITH ID: ', req.params.id);
  console.log('Is passport ID same as Mongo', req.user._id);
  var userId = req.user._id;
  var taskId = req.params.id;
  House.update(
    { // Limit search to a specific house
         members: userId
    }, // Limit search to aspecific house
      { $pull : { notes: { _id: req.params.id }}},
    function(err, data) {
      if(err) {
        console.log('remove error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  )
}); //end delete





module.exports = router;
