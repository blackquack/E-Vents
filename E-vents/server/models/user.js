// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  name: String,
  email: String,
  username: {
    type: String,
    trim: true,
    unique: true
  },
  password: String,
  provider: String,
  providerId: String,
  providerData: {},
  
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