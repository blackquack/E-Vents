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
    admin: {type: Boolean, default: false},
    pages: {welcome: Number, profile: Number, edit: Number},
    ipAddress: String,
    location: String,
    attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    created_at: {type: Date, default: Date.now}
})


module.exports = mongoose.model('User', User);