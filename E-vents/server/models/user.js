// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: {type: String, unique: true, required: true},
  password: String,
  displayName: String
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

module.exports = mongoose.model('users', User);