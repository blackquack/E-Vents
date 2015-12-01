var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    date: Date,
    cost: Number,
    games: [String],
    likes: Number,
    game: String,
    comments: [{username:String, comment:String}],
    creator: String,
    attendance: [String]
});

module.exports = mongoose.model('Post', PostSchema);