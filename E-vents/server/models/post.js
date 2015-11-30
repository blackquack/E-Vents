var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    name: String,
    location: String,
    date: Date,
    cost: Number,
    likes: Number,
    game: String,
    comments: [{username:String, comment:String}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

PostSchema.statics.getPost = function(id, callback) {
    this.findOne({_id: id}, function(err, post) {
        if (err) {
            callback(err, post);
        } else {
            callback(null, post);
        }
    });
}

module.exports = mongoose.model('Post', PostSchema);