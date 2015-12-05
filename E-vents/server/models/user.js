// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
    username   : String,
    name       : String,
    password   : String,
    providerData : {},
    provider   : String,
    providerId : String,
    displayName: String,
    description: String,
    imageLocation: String,
    type: String,
    pages: {welcome: Number, profile: Number, edit: Number},
    ipAddress: String,
    location: String,
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    created_at: {type: Date, default: Date.now}
})


// generating a hash
/*User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
*/
module.exports = mongoose.model('users', User);
