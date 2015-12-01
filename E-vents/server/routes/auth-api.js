var express = require('express'),
    router = express.Router(),
    passport = require('passport');
    User = require('../models/user.js'), //mongo model
    path = require('path');

/* request to register a user */
router.post('/register', function(req, res) {
      console.log(req.body);
      console.log("Registering a new user : " + req.body.username);
      User.register(new User({
      username: req.body.username,
      name: ""
      }),
      req.body.password,
      function(err, user) {
        if (err) {return res.status(409).json({err: err})}

        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({status: 'Registration successful !'})
        });
    });

});

/* request to log in user */
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { res.status(500).json({err: err}); }
    // if no user found
    if (!user) {return res.status(401).json({err: info})}

    req.logIn(user, function(err) {
      if (err) {return res.status(500).json({err: 'Could not log in user'});}
      res.status(200).json({status: 'Login successful!'})
    });

  })(req, res, next);
});

/* request to log out user */
router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'logout successfully!'})
});




module.exports = router;
