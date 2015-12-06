var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req.user);
  console.log("=====");
  if (req.user){
    console.log("User loged in : "+req.user.name);
  }
  else{
    console.log('no user logged in');
  }
  console.log("======");
  res.render("index",{
      title : 'testing',
    	user: JSON.stringify(req.user),
    });

});

module.exports = router;
