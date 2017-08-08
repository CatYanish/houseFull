var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Mongoose Schema
var TaskSchema = new Schema({
    username: {type: String, required: true},
    houseName: {type: String, required: true},
    room: {type: String},
    time: {type: Number},
    date: {type: Date},
    description: {type: String}
});

var HouseScheme = new Schema ({
  houseName: {type: String},
  members: [{type: Number}],
  tasks: [TaskSchema],
  code: {type: String}
});



module.exports = mongoose.model('Task', TaskSchema);
