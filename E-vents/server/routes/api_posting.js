var express = require('express'),
    router = express.Router(),
    Post = require('../models/post.js');

router.post('/register', function(req, res) {
    Post.create({ 
        name: req.body.name, 
        location: req.body.location,
        date: req.body.date,
        cost: req.body.cost,
        likes: 0,
        comments: []
    }, function(err, post) {
        if (err) return res.status(409).send({err: err}); 
        return res.status(200).send(post);
    })
});

router.get('/all', function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) return res.status(409).send({err: err}); 
        return res.status(200).send(posts);
    })
});

module.exports = router;