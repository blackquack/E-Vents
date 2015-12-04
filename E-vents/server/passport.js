var LocalStrategy  = require("passport-local").Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./models/user');
var bCrypt = require('bcrypt-nodejs');
var configAuth = require('./oauth_config'); // use this one for testing
var util = require('util');

module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

//---------------------------------------------------------------------------------
    //local login
    passport.use('local-login', new LocalStrategy({
    		passReqToCallback : true
    	},
    	function(req, username, password, done) {
    		// check in mongo if a user with username exists or not

    		User.findOne({ 'username' :  username },
    			function(err, user) {
    				// In case of any error, return using the done method
    				if (err)
    					return done(err);
    				// Username does not exist, log the error and redirect back
    				if (!user){
    					console.log('User Not Found with username '+username);
    					return done(null, false);
    				}
    				// User exists but wrong password, log the error
    				if (!isValidPassword(user, password)){
    					console.log('Invalid Password');
    					return done(null, false); // redirect back to login page
    				}
    				// User and password both match, return user from done method
    				// which will be treated like success
    				return done(null, user);
    			}
    		);
    	}
    ));



  	passport.use('local-signup', new LocalStrategy({

        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password, done) {

        // asynchronous
        process.nextTick(function() {
        	//console.log(util.inspect(req.body, false, null));
            // find a user in mongo with provided username
            User.findOne({ 'username' :  username }, function(err, user) {
            	// In case of any error, return using the done method
            	if (err){
            		console.log('Error in SignUp: '+err);
            		return done(err);
            	}
            	// already exists
            	if (user) {
            		console.log('User already exists with username: '+username);
            		return done(null, false);
            	} else {
            		// if there is no user, create the user
            		var newUser = new User();

            		// set the user's local credentials
            		newUser.username = username;
            		newUser.name = req.body.name;
            		newUser.password = createHash(password);
            		newUser.provider = "local";

            		// save the user
            		newUser.save(function(err) {
            			if (err){
            				console.log('Error in Saving user: '+err);
            				throw err;
            			}
            			console.log(newUser.username + ' Registration succesful');
            			return done(null, newUser);
            		});
            	}
            });

        });

    }));

	passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitter.clientID,
        consumerSecret  : configAuth.twitter.clientSecret,
        callbackURL     : configAuth.twitter.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, tokenSecret, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
           		console.log(util.inspect(profile,false,null));

                User.findOne({ 'providerId.id' : profile.id_str, 'username' : profile.username }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                    	console.log("so user found");
                        // if there is a user id already but no token (user was linked at one point and then removed)





                        return done(null, user); // user found, return that user
                    } else {
                    	console.log("new twitter user");
                        // if there is no user, create them
                        var newUser                 = new User();

                        var providerData            = profile._json;
                        //console.log(util.inspect(providerData,false,null));
                        providerData.token          = token;
                        providerData.tokenSecret    = tokenSecret;

                        newUser.provider            = "twitter";
                        newUser.providerId          = profile.id;
                        newUser.providerData        = providerData;
                        newUser.username            = profile.username;
                        newUser.name                = profile.displayName;

                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }
                });


        });

    }));

//---------------------------------

//---------------------------------
	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

  var enableCall = function(){

  }
}
