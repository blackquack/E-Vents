var express = require('express'),
    router = express.Router(),
    Post = require('../models/post.js');

router.post('/register', function(req, res) {
    Post.create({ 
        name: req.body.name, 
        location: req.body.location,
        date: req.body.date,
        cost: req.body.cost
    }, function(err, post) {
        if (err) return res.status(409).send({err: err}); 
        console.log("User added"); 
        return res.status(200).send(post);
    })
});

module.exports = router;