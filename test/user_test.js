var request = require('supertest');
var expect = require("chai").expect;
var mongoose = require('mongoose');

var Post = require('../server/models/post')
var User = require('../server/models/user')

var app = require('../server/app');

describe('User Test', function() {
	describe('Register Test', function() {
		after('Deleting user', function(done) {
			User.collection.drop();
			done();
		});

		it('should register a user properly', function(done) {
			request(app)
			.post('/auth/register')
			.send({ username: 'username', password: 'password' })
			.end(function(err, res) {
				User.count({}, function(err, count) {
					if (err) throw err;
					expect(count).equal(1);
				});
				User.findOne({ username: 'username' }, function(err, user) {
					if (err) throw err;
					expect(user.admin).equal(false);
					done();
				});
			});
		});
	});

	describe('Getting users', function() {
		before('Create multiple users', function(done) {
			for (var i = 0; i < 3; i++) {
				User.create({ username: 'username-' + i, password: 'password' }, function(err) {
					if (err) throw err;
				});
			}
			done();
		});

		after('Deleting user', function(done) {
			User.collection.drop();
			done();
		});

		it('should get all users', function(done) {
			request(app)
			.get('/api/user/all')
			.expect(200)
			.end(function(err, res) {
				expect(res.body).instanceOf(Array);
				expect(res.body).to.have.length(3);
				User.find({}, function(err, users) {
					for (var i = 0; i < 3; i++) {
						expect(res.body[i].username).equal(users[i].username);
						expect(res.body[i].admin).equal(false);
					}
					done();
				});
			});
		});

		it('should get user from username', function(done) {
			request(app)
			.get('/api/user/' + 'username-0')
			.expect(200)
			.end(function(err, res) {
				User.findOne({ username: res.body.username }, function(err, user) {
					expect(res.body.username).equal('username-0');
					expect(res.body.admin).equal(false);
					done();
				});
			});
		});
	});

	describe('Check attendance at event', function() {
		var event_name = 'Test Event';
		var event_id;
		var username = 'username'

		before('Create user and join an event', function(done) {
			Post.create({ name: event_name, creator: username, attendance: [username] }, function(err, post) {
				if (err) throw err;
				event_id = post.id;
				User.create({ username: username, password: 'password', attendance: [post.id] }, function(err) {
					if (err) throw err;
					done();
				});
			});
		});

		after('Drop user and event', function(done) {
			User.collection.drop();
			Post.collection.drop();
			done();
		});

		it('should have event listed as attendance', function(done) {
			request(app)
			.get('/api/user/username/attendance')
			.expect(200)
			.end(function(err, res) {
				expect(res.body.attendance).instanceOf(Array);
				expect(res.body.attendance[0]._id).equal(event_id);
				done();
			});
		});
	});

	describe('Check for message functionality', function() {
		before('Create two users', function(done) {
			User.create([{ username: 'user-1', password: 'password' }, { username: 'user-2', password: 'password' }], function(err) {
				if (err) throw err;
				done();
			});
		});

		after('Drop users', function(done) {
			User.collection.drop();
			done();
		});

		it('should send message from user-1 to user-2', function(done) {
			request(app)
			.post('/api/user/message')
			.send({ from:'user-1', to: 'user-2', date: new Date(), message: 'Test message.'})
			.end(function(err, res) {
				User.findOne({ username: 'user-2'}, function(err, user) {
					expect(user.messages).to.have.length(1);
					Message.findOne({ _id: user.messages[0] }, function(err, message) {
						expect(message.from).equal('user-1');
						expect(message.to).equal('user-2');
						expect(message.message).equal('Test message.');
						done();
					});
				});
			});
		});
	});
});