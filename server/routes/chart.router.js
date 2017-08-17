var express = require('express');
var router = express.Router();
var House = require('../models/house.schema.js');
var path = require('path');
var mongoose = require('mongoose');


router.get('/', function(req, res) {
console.log('in the get /chart route');
  if(req.isAuthenticated()) {
    console.log('auth is true on /chart route');
    var userId = mongoose.Types.ObjectId(req.user._id);
    House.aggregate([
      { $match: { // Limit search to a specific house
          members: userId
      }},
      { $unwind: "$tasks" },

  // Flattens the array of tasks to make grouping easier

      { $sort: { "tasks.date": -1 } },
      { $limit: 50 },
      { $group: {
           _id: "$tasks.username", // Group by
           total: { $sum: "$tasks.time" } // Sum field
      }}
    ]).then(function(data) {
          //console.log('all of everything in the house', foundHouse);
          console.log('here is the aggregated info', data);
          res.send(data);
       }).catch(function(err){
         console.log('Error with find and aggregate');
         res.send(500);
       })
 } else {
   // failure best handled on the server. do redirect here.
   console.log('not logged in');
   // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
   res.send(false);
 }
  });






module.exports = router;
