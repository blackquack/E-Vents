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

User.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne(
		{username: possibleUsername},
		function(err, user) {
			if (!err) {
				if (!user) {
					callback(possibleUsername);
				}
				else {
					return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				}
			}
			else {
				callback(null);
			}
		}
	);
};

// add on passport-local-mongoose methods to User schema
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
