var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
    name: String,
    location: String,
    date: String,
    cost: String
});

PostSchema.statics.getPost = function(id, callback) {
    this.findOne({id: id}, function(err, post) {
        if (err) {
            callback(err, post);
        } else {
            callback(null, post);
        }
    });
}

module.exports = mongoose.model('Post', PostSchema);