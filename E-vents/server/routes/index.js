var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.user);
  console.log("=====");
  if (req.user){
    console.log(req.user.name);
  }
  else{
    console.log('no user logged in');
  }
  console.log("======");
  console.log(req.fresh);
  res.render("index",{
    	title: 'abc',
    	user: JSON.stringify(req.user),
      test : 'before'
    });

  console.log('data sent');
});



module.exports = router;
