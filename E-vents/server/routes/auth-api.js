var express = require('express'),
    router = express.Router(),
    passport = require('passport');
    User = require('../models/user.js'), //mongo model
    path = require('path');

/* request to register a user */
router.post('/register', function(req, res) {


    User.register(new User({ 
      username: req.body.username, 
      displayName: "", 
      description: "", type: userLevel,
      //imageLocation: path.join(__dirname, '../images/default', 'default.gif'),
      pages: {welcome: 0, profile:0, edit:0},
      }), 

      req.body.password, function(err, account) {
        if (err) {
          return res.status(409).json({err: err})
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({status: 'Registration successful!'})
        });
    });

});

/* request to log in user */
router.post('/login', function(req, res, next) {
  req.isAuthenticated
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.status(401).json({err: info})
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'})
      }
      res.status(200).json({status: 'Login successful!'})
    });
  })(req, res, next);
});

/* request to log out user */
router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'})
});

/* request to change password */
router.post('/changepass' , function (req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    user.setPassword(req.body.password, function() {
          user.save();
    })
    if (err) { return res.status(404).json({status: 'User not found!'}) }
  });
  res.status(200).json({status: 'Successfully changed password.'})
});

module.exports = router;