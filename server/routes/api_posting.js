var express = require('express'),
    router = express.Router(),
    Post = require('../models/post.js');
    User = require('../models/user.js');

router.post('/register', function(req, res) {
    User.findOne({ username: req.body.creator }, function(err, user) {
        if (err) return res.status(400).send({err: err});
        Post.create({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            cost: req.body.cost,
            games: req.body.games,
            likes: 0,
            comments: [],
            creator: user,
            attendance: [user]
        }, function(err, post) {
            if (err) return res.status(409).send({err: err});
            User.update({ username: req.body.creator }, { $push: { attendance: post.id } }, function(err) {
                if (err) return res.status(400).send({err: err});
                return res.status(200).send(post);
            });
        });
    });
});

router.get('/all', function(req, res) {
    Post.find({})
    .exec(function(err, posts) {
        if (err) return res.status(400).send({err: err});
        return res.status(200).send(posts);
    });
});

router.get('/:id', function(req, res) {
    Post.findOne({ _id: req.params.id })
    .populate('creator attendance')
    .populate('comments.user')
    .exec(function(err, post) {
        if (err) return res.status(400).send({err: err});
        return res.status(200).send(post);
    });
});

router.get('/name/:name', function(req, res) {
    Post.findOne({ name: req.params.name })
    .exec(function(err, post) {
        if (err) return res.status(400).send({err: err});
        return res.status(200).send(post);
    });
});

router.get('/location/:location', function(req, res) {
    Post.find({ location: req.params.location })
    .exec(function(err, posts) {
        if (err) return res.status(400).send({err: err});
        return res.status(200).send(posts);
    });
});

router.get('/game/:game', function(req, res) {
    Post.find({ games: req.params.game })
    .exec(function(err, posts) {
        if (err) return res.status(400).send({err: err});
        return res.status(200).send(posts);
    });
});

router.post('/join', function(req, res) {
    User.findOneAndUpdate({ username: req.body.user }, { $addToSet: { attendance: req.body.id } }, function(err, user) {
        if (err) return res.status(400).send({err: err});
        Post.update({ _id: req.body.id }, { $addToSet: { attendance: user } }, function(err) {
            if (err) return res.status(400).send({err: err});
            return res.sendStatus(200);
        });
    });
});

router.post('/comment', function(req, res) {
    User.findOne({ username: req.body.user }, function(err, user) {
        if (err) return res.status(400).send({err: err});
        Post.update({ _id: req.body.id }, { $addToSet: { comments: { user: user, comment: req.body.comment } } }, function(err) {
            if (err) return res.status(400).send({err: err});
            return res.sendStatus(200);
        });
    });
});

router.post('/like', function(req, res) {
     User.findOne({ username: req.body.user }, function(err, user) {
        for (var i = 0; i < user.likes.length; i++) {
            if (user.likes[i] == req.body.id) {
                return res.sendStatus(400);
            }
        }
        user.likes.push(req.body.id);
        user.save(function(err) {
            if (err) return res.status(400).send({err: err});
            Post.findByIdAndUpdate(
                req.body.id,
                { $inc: { likes: 1 }},
                { safe: true, upsert: true },
                function(err, post) {
                    if (err) return res.status(400).send({err: err});
                    return res.sendStatus(200);
                }
            );
        });
    });
});

router.post('/unlike', function(req, res) {
    User.findOne({ username: req.body.user }, function(err, user) {
        for (var i = 0; i < user.likes.length; i++) {
            if (user.likes[i] == req.body.id) {
                user.likes.splice(i, 1);
                i--;
            }
        }
        user.save(function(err) {
            if (err) return res.status(400).send({err: err});
            Post.findByIdAndUpdate(
                req.body.id,
                { $inc: { likes: -1 }},
                { safe: true, upsert: true },
                function(err, post) {
                    if (err) return res.status(400).send({err: err});
                    return res.sendStatus(200);
                }
            );
        });
    });
});

router.post('/edit', function(req, res) {
    Post.update({ _id: req.body.id }, 
    {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        cost: req.body.cost,
        games: req.body.games,
    }, function(err) {
        if (err) return res.status(400).send({err: err});
        return res.sendStatus(200);  
    });
});

router.delete('/delete', function(req, res) {
    Post.remove({ _id: req.body.id }, function(err) {
        User.update({ attendance: req.body.id }, { $pull: { attendance: req.body.id } }, function(err) {
            User.update({ likes: req.body.id }, { $pull: { likes: req.body.id } }, function(err) {
                if (err) return res.status(400).send({err: err});
                return res.sendStatus(200);  
            });
        });
    });
});

module.exports = router;

