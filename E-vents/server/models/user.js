// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: {type: String, unique: true, required: true},
  password: String,
  displayName: String,
  description: String,
  imageLocation: String,
  type: String,
  pages: {welcome: Number, profile: Number, edit: Number},
  ipAddress: String,
  location: String,
  attendance: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

// bcrypt middleware
User.pre('save', function(next){
    var user = this;

    //check if password is modified, else no need to do anything
    if (!user.isModified('pass')) {
       return next()
    }

    user.pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    next()
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);