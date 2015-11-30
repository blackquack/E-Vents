var express = require('express'),
    router = express.Router(),
    Post = require('../models/post.js');
    User = require('../models/user.js');

router.post('/register', function(req, res) {
    Post.create({ 
        name: req.body.name, 
        location: req.body.location,
        date: req.body.date,
        cost: req.body.cost,
        likes: 0,
        comments: [],
        creator: req.user,
        attendance: []
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

router.get('/:id', function(req, res) {
    Post.findOne({ _id: req.params.id }, function(err, post) {
        if (err) return res.status(409).send({err: err});
        return res.status(200).send(post);
    });
});

router.get('/:title', function(req, res) {
    Post.find({ _id: req.params.title }, function(err, post) {
        if (err) return res.status(409).send({err: err});
        return res.status(200).send(posts)
    });
});

router.get('/:location', function(req, res) {
    Post.find({ _id: req.params.location }, function(err, post) {
        if (err) return res.status(409).send({err: err});
        return res.status(200).send(posts)
    });
});

router.post('/:id/join/:user', function(req, res) {
    Post.update({ _id: req.params.id }, { $push: { attendance: req.params.user } }, function(err) {
        if (err) return res.status(400).send({err: err});
        return res.send(200);
    });
});

router.post('/:id/comment/:user', function(req, res) {
    Post.update({ _id: req.params.id }, { $push: { comments: { username: req.params.user, comment: req.body.comment } } }, function(err) {
        if (err) return res.status(400).send({err: err});
        return res.send(200);
    });
});

router.post('/:id/like/:user', function(req, res) {
    Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 }},
        { new: true, safe: true, upsert: true },
        function(err, post) {
            if (err) return res.status(400).send({err: err});
            User.update({ username: req.params.user }, { $push: { likes: post._id } }, function(err) {
                if (err) return res.status(400).send({err: err});
            });
            return res.send(200);
        }
    );
});

router.post('/:id/unlike/:user', function(req, res) {
    Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: -1 }},
        { new: true, safe: true, upsert: true },
        function(err, post) {
            if (err) return res.status(400).send({err: err});
            User.update({ username: req.params.user }, { $pull: { likes: post._id } }, function(err) {
                if (err) return res.status(400).send({err: err});
            });
            return res.send(200);
        }
    );
});

module.exports = router;