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




  //this route sends a list of all the tasks completed in the house//
  router.get('/', function(req, res) {
    if(req.isAuthenticated()) {
      console.log('in the get all tasks route');
      var userId = mongoose.Types.ObjectId(req.user._id);
      House.aggregate([
        { $match: { // Limit search to a specific house
          members: userId
        }},
        { $unwind: "$tasks" },
        { $sort: { "tasks.date": -1 } },
        { $limit: 50 }
        // Flattens the array of tasks to make grouping easier
      ]).then(function(foundHouse) {
        //console.log('all of everything in the house', foundHouse);
        console.log('this is foundhouse response', foundHouse);

        var taskList = [];


        for (var i = 0; i < foundHouse.length; i++) {
          console.log('this is foundhouse[i].tasks', foundHouse[i].tasks);
          var task = foundHouse[i].tasks;
          taskList.push(task);
        }

        console.log('here is the array I want to push to', taskList);
        res.send(taskList);

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
      { $pull : { tasks: { _id: req.params.id }}},
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
