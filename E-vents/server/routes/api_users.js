var express = require('express'),
router = express.Router(),
User = require('../models/user.js');
Message = require('../models/message.js');

router.get('/all', function(req, res) {
    User.find({}, function(err, users) {
        if (err) return res.status(409).send({err : err});
        return res.status(200).send(users);
    });
});

router.get('/:user', function(req, res) {
    User.findOne({ username: req.params.user }, function(err, user) {
        if (err) return res.status(409).send({err : err});
        return res.status(200).send(user);
    });
});

router.get('/:user/messages', function(req, res) {
    User.
    findOne({ username: req.params.user }).
    populate('messages').
    select('messages').
    exec(function(err, messages) {
        if (err) return res.status(409).send({err : err});
        return res.status(200).send(messages);
    });
});

router.get('/:user/messages/:id', function(req, res) {
    User.
    findOne({ username: req.params.user }).
    select('messages').
    where({ messages: { $in: [req.params.id] }}).
    populate('messages').
    exec(function(err, message) {
        if (err) return res.status(409).send({err : err});
        return res.status(200).send(message[0]);
    });
});

router.post('/message', function(req, res) {
    Message.create({
        from: req.body.from,
        to: req.body.to,
        date: req.body.date,
        message: req.body.message
    }, function(err, message) {
        if (err) return res.status(409).send({err: err});
        User.update({ username: req.body.to }, { $push: { messages: message.id } }, function(err) {
            if (err) return res.status(400).send({err: err});
            return res.send(200);
        });
    });
});

module.exports = router;
