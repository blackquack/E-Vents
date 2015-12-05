// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

<<<<<<< HEAD
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
=======
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
>>>>>>> a903f0e4a4dfe1f79992c8beac245e332f62c507
})


<<<<<<< HEAD
module.exports = mongoose.model('User', User);
=======
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
>>>>>>> a903f0e4a4dfe1f79992c8beac245e332f62c507
