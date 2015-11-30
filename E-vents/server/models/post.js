var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    name: String,
    location: String,
    date: Date,
    cost: Number,
    likes: Number,
    game: String,
    comments: [{username:String, comment:String}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Post', PostSchema);