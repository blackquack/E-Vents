var express = require('express');
var router  = express.Router();
var User    = require('../models/user.js'); //mongo model


module.exports = function(passport){

  router.get('/success', function(req, res){
    console.log("This     fsdfsdfs  " + req.user);
    console.log("-----------------------");
    console.log("This     fsdfsdfs  " + JSON.stringify(req.body));
    console.log("-----------------------");
    console.log("This     fsdfsdfs  " + req);
    res.send({state: 'success', user: req.user ? req.user : null});
  });

  router.get('/failure', function(req, res){
    res.send({state: 'failure', user: null, message: "Invalid username or password"});
  });

  router.post('/register', passport.authenticate('local-signup', {
      successRedirect : '/auth/success', // redirect to the secure profile section
      failureRedirect : '/auth/failure' // redirect back to the signup page if there is an error
  }));

  /* request to log in user */
  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  }));

//---------------------------------------------------
// OAuth 

  router.get('/twitter', passport.authenticate('twitter', { scope : 'email' }));

  // handle the callback after twitter has authenticated the user
  router.get('/twitter/callback',
      passport.authenticate('twitter', {
          successRedirect : '/auth/success',
          failureRedirect : '/auth/failure'
      })
  );

  /* request to log out user */
  router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({status: 'logout successfully!'})
  });

  return router;

}

