// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');
    
/*
var User = new Schema({

    local            : {
        email        : String,
        password     : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    }

});*/


var User = new mongoose.Schema({
    username: String,
    password: String, //hash created from password
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
