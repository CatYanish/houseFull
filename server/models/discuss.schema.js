var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Mongoose Schema
var TaskSchema = new Schema({
    username: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId},
    room: {type: String},
    time: {type: Number},
    date: {type: Date},
    description: {type: String}
});

var DiscussionSchema = new Schema ({
  houseName: {type: String},
  code: {type: String},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  comments: [CommentSchema],
  reactions: [{type: String}]
});



module.exports = mongoose.model('houses', HouseSchema);
