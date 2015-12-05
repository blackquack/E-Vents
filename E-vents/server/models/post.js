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

<<<<<<< HEAD
module.exports = mongoose.model('Post', PostSchema);
=======
module.exports = mongoose.model('Post', PostSchema);
>>>>>>> a903f0e4a4dfe1f79992c8beac245e332f62c507
