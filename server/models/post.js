var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    date: Date,
    cost: Number,
    games: [String],
    likes: Number,
    comments: [{user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, comment:String}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Post', PostSchema);