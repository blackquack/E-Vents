var express = require('express');
var router  = express.Router();
var User    = require('../models/user.js'); //mongo model
var cors     = require('cors');
var util   = require('util');

module.exports = function(passport){

  router.get('/success', function(req, res){
    //res.send({state: 'success', user: req.user ? req.user : null});
    res.redirect('/');
  });

  router.get('/failure', function(req, res){
    res.redirect(401,'/');
  });

  router.post('/register', passport.authenticate('local-signup', {
      successRedirect : '/auth/success', // redirect to the secure profile section
      failureRedirect : '/auth/failure' // redirect back to the signup page if there is an error
  }));

  /* request to log in user */
  router.post('/login',passport.authenticate('local-login', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  }));

  router.post('/adminlogin',logout,passport.authenticate('local-login', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  }));
//---------------------------------------------------
// OAuth

  router.get('/twitter',  passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  router.get('/twitter/callback',
      passport.authenticate('twitter', {
          successRedirect : '/',
          failureRedirect : '/auth/failure'

      })
  );

  /* request to log out user */
  router.get('/logout', function(req, res) {
    console.log(util.inspect(req.session,null,false));
    req.session.destroy();
    req.logout();
    res.redirect('/');
  });

  return router;

}

var logout = function (req,res,next){
    if (req.user){
        req.logout();
    }
    next();
}
