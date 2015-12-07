var request = require('supertest');
var expect = require("chai").expect;
var mongoose = require('mongoose');

var Post = require('../server/models/post')
var User = require('../server/models/user')

var app = require('../server/app');

describe("Post Test", function() {
	var getPosts = function(num) {
		//Create game list
		var games = [];
		for (var i = 0; i < num; i++) {
			games.push('Game-' + i);
		}

		var posts = []
		for (var i = 0; i < num; i++) {
			var post = {};
			post.name = 'Test Event-' + i;
			post.description = 'New event description';
			post.location = 'Location-' + i;
			post.likes = 0;
			post.cost = Math.floor(Math.random() * 10);
			post.games = games.splice(0, i + 1);
			posts.push(post);
		}
		return posts;
	}


	describe("Register", function() {
		after(function(done) {
			Post.collection.drop();
    		done();
		});

		it("should create a proper event", function(done) {
			request(app)
			.post('/api/post/register')
			.type('json')
			.send({
				name: "Test Event",
	        	description: "New event description",
	        	location: "Toronto",
	        	date: new Date(),
	        	cost: 5,
	        	games: ["Game-1", "Game-2"],
	        	creator: "TestUser",
	        	attendance: ["TestUser"]
			})
			.expect(200)
			.end(function(err, res) {
				expect(res.body.name).equal("Test Event");
				expect(res.body.description).equal("New event description");
				expect(res.body.location).equal("Toronto");
				expect(res.body.cost).equal(5);
				expect(res.body.games).to.deep.equal(["Game-1", "Game-2"]);
	        	expect(res.body.creator).equals("TestUser");
	        	expect(res.body.attendance).to.deep.equal(["TestUser"]);
				done();
			});
		});
	});

	describe("Get Postings", function() {
		var num = 3;
		var expectedPosts;
		var ids;

		before("Create Postings", function(done) {
			expectedPosts = getPosts(num);
			ids = [];
			Post.create(expectedPosts, function(err, posts) {
				for (var i = 0; i < num; i++) {
					ids.push(posts[i].id);
				}
				done();
			});
		});

		after("Delete Postings", function(done) {
			Post.collection.drop();
			done();
		});

		it("should get all posts", function(done) {
			request(app)
			.get('/api/post/all')
			.expect(200)
			.end(function(err, res) {
				expect(res.body.length).equal(expectedPosts.length);
				for (var i = 0; i < expectedPosts.length; i++) {
					expect(res.body[i].name).equals(expectedPosts[i].name);
					expect(res.body[i].description).equals(expectedPosts[i].description);	
					expect(res.body[i].location).equals(expectedPosts[i].location);	
					expect(res.body[i].likes).equals(expectedPosts[i].likes);	
					expect(res.body[i].cost).equals(expectedPosts[i].cost);	
					expect(res.body[i].games).to.deep.equal(expectedPosts[i].games);					
				}
				done();
			});
		});

		it("should get post from id", function(done) {
			var index = Math.floor(Math.random() * (num - 1));
			request(app)
			.get('/api/post/' + ids[index])
			.expect(200)
			.end(function(err, res) {
				expect(res.body.name).equals(expectedPosts[index].name);
				expect(res.body.description).equals(expectedPosts[index].description);	
				expect(res.body.location).equals(expectedPosts[index].location);	
				expect(res.body.likes).equals(expectedPosts[index].likes);	
				expect(res.body.cost).equals(expectedPosts[index].cost);	
				expect(res.body.games).to.deep.equal(expectedPosts[index].games);
				done();
			});
		});

		it("should get all post from the name", function(done) {
			var index = Math.floor(Math.random() * (num - 1));
			var name = expectedPosts[index].name;
			request(app)
			.get('/api/post/name/' + name)
			.expect(200)
			.end(function(err, res) {
				//Returns the result as an array
				expect(res.body).instanceOf(Array);
				expect(res.body[0].name).equals(expectedPosts[index].name);
				expect(res.body[0].description).equals(expectedPosts[index].description);	
				expect(res.body[0].location).equals(expectedPosts[index].location);	
				expect(res.body[0].likes).equals(expectedPosts[index].likes);	
				expect(res.body[0].cost).equals(expectedPosts[index].cost);	
				expect(res.body[0].games).to.deep.equal(expectedPosts[index].games);
				done();
			});
		});

		it("should get all posts based from the location", function(done) {
			var location = expectedPosts[0].location;
			request(app)
			.get('/api/post/location/' + location)
			.expect(200)
			.end(function(err, res) {
				//Returns the result as an array
				expect(res.body).instanceOf(Array);
				expect(res.body[0].name).equals(expectedPosts[0].name);
				expect(res.body[0].description).equals(expectedPosts[0].description);
				expect(res.body[0].location).equals(expectedPosts[0].location);		
				expect(res.body[0].date).equals(expectedPosts[0].date);	
				expect(res.body[0].likes).equals(expectedPosts[0].likes);	
				expect(res.body[0].cost).equals(expectedPosts[0].cost);	
				expect(res.body[0].games).to.deep.equal(expectedPosts[0].games);
				done();
			});
		});

		it("should get all posts based from the game", function(done) {
			//Game is Game-2
			var game = 'Game-2'
			request(app)
			.get('/api/post/game/' + game)
			.expect(200)
			.end(function(err, res) {
				//Returns the result as an array
				expect(res.body).instanceOf(Array);
				for (var i = 0; i < res.body.length; i++) {
					expect(res.body[i].name).equals(expectedPosts[i + 1].name);
					expect(res.body[i].description).equals(expectedPosts[i + 1].description);
					expect(res.body[i].location).equals(expectedPosts[i + 1].location);			
					expect(res.body[i].likes).equals(expectedPosts[i + 1].likes);	
					expect(res.body[i].cost).equals(expectedPosts[i + 1].cost);	
					expect(res.body[i].games).to.include(game);
					done();
				}
			});
		});
	});
	
	describe('Join an event', function() {
		var username = 'testuser';
		var password = 'password';
		var id;

		beforeEach('Create post and user', function(done) {
			var expectedPost = getPosts(1)[0];	
			Post.create(expectedPost, function(err, post) {
				id = post.id;
			});
			request(app)
			.post('/auth/register')
			.send({ username: username, password: password })
			.end(function(err, res) {
				if (err) throw err;
				done();
			});
		});

		afterEach('Drop post and user', function(done) {
			Post.collection.drop();
			User.collection.drop();
			done();
		});

		it('should be added to the attendace list of the post', function(done) {
			request(app)
			.post('/api/post/join')
			.send({ id: id, user: username })
			.expect(200)
			.end(function(err, res) {
				Post.findOne({ _id: id }, function(err, post) {
					if (err) throw err;
					expect(post.attendance).to.have.length(1);
					expect(post.attendance[0]).equals(username);
					done();
				});
			});
		});

		it('should be added to the attendace list of the user', function(done) {
			request(app)
			.post('/api/post/join')
			.send({ id: id, user: username })
			.expect(200)
			.end(function(err, res) {
				User.findOne({ username: username }, function(err, user) {
					if (err) throw err;
					expect(user.attendance).to.have.length(1);
					expect(user.attendance[0] + '').equals(id);
					done();
				});
			});
		});

		it('should not allow user to join to an already joined event', function(done) {
			User.update({ username: username }, { $push: { attendace: id } }, function(err) {
				if (err) throw err;
				Post.update({ _id: id }, { $push: { attendace: id } }, function(err) {
					if (err) throw err;
					request(app)
					.post('/api/post/join')
					.send({ id: id, user: username })
					.expect(200)
					.end(function(err, res) {
						User.findOne({ username: username }, function(err, user) {
							if (err) throw err;
							expect(user.attendance).to.have.length(1);
							expect(user.attendance[0] + '').equals(id);
							Post.findOne({ _id: id }, function(err, post) {
								if (err) throw err;
								expect(post.attendance).to.have.length(1);
								expect(post.attendance[0]).equals(username);
								done();
							});
						});
					});
				});
			});
		});
	});

	describe('Like an event', function() {
		var username = 'testuser';
		var password = 'password';
		var id;

		beforeEach('Create post and user', function(done) {
			var expectedPost = getPosts(1)[0];
			Post.create(expectedPost, function(err, post) {
				id = post.id;
			});	
			request(app)
			.post('/auth/register')
			.send({ username: username, password: password })
			.end(function(err, res) {
				if (err) throw err;
				done();
			})

		});

		afterEach('Drop post and user', function(done) {
			Post.collection.drop();
			User.collection.drop();
			done();
		});

		it ('should increment the number of likes by one', function(done) {
			request(app)
			.post('/api/post/like')
			.send({ id: id, user: username })
			.expect(200)
			.end(function(err, res) {
				Post.findOne({ _id: id }, function(err, post) {
					expect(post.likes).equals(1);
					done();
				});
			});
		});

		it ('should be added to the list of likes of the user', function(done) {
			request(app)
			.post('/api/post/like')
			.send({ id: id, user: username })
			.expect(200)
			.end(function(err, res) {
				User.findOne({ username: username }, function(err, user) {
					expect(user.likes).to.include(id);
					done();
				});
			});
		});

		it ('should not allow a user to like a post twice', function(done) {
			User.update({ username: username }, { $push: { likes: id } }, function(err) {
				if (err) throw err;
				Post.update({ _id: id }, { $inc: { likes: 1 } }, function(err) {
					if (err) throw err;
					request(app)
					.post('/api/post/like')
					.send({ id: id, user: username })
					.expect(200)
					.end(function(err, res) {
						Post.findOne({ _id: id }, function(err, post) {
							if (err) throw err;
							expect(post.likes).equals(1);
							User.findOne({ username: username }, function(err, user) {
								expect(user.likes).to.have.length(1);
								expect(user.likes[0] + '').equals(id);								
								done();
							})
						});
					});
				});
			});
		});
	});
	
	describe('Unlike an event', function() {
		var username = 'testuser';
		var password = 'password';
		var id;

		beforeEach('Create post and user', function(done) {
			var expectedPost = getPosts(1)[0];
			Post.create(expectedPost, function(err, post) {
				id = post.id;
			});	
			request(app)
			.post('/auth/register')
			.send({ username: username, password: password })
			.end(function(err, res) {
				if (err) throw err;
				request(app)
				.post('/api/post/like')
				.send({ id: id, user: username })
				.end(function(err, res) {
					if (err) throw err;
					done();
				});
			});
		});

		afterEach('Drop post and user', function(done) {
			Post.collection.drop();
			User.collection.drop();
			done();
		});

		it('should decrement the number of likes by one', function(done) {
			request(app)
			.post('/api/post/unlike')
			.send({ id: id, user: username })
			.end(function(err, res) {
				Post.findOne({ _id: id }, function(err, post) {
					expect(post.likes).equals(0);
					done();
				});	
			});
		});

		it('should be deleted from the list of likes of the user', function(done) {
			request(app)
			.post('/api/post/unlike')
			.send({ id: id, user: username })
			.end(function(err, res) {
				User.findOne({ username: username }, function(err, user) {
					expect(user.likes).to.have.length(0);
					done();
				});	
			});
		});

		it('should not be able to unlike a post twice', function(done) {
			User.update({ username: username }, { $pull: { likes: id } }, function(err) {
				if (err) throw err;
				Post.update({ _id: id }, { $inc: { likes: -1 } }, function(err) {
					if (err) throw err;
					request(app)
					.post('/api/post/unlike')
					.send({ id: id, user: username })
					.end(function(err, res) {
						Post.findOne({ _id: id }, function(err, post) {
							if (err) throw err;
							console.log(post.likes);
							User.findOne({ username: username }, function(err, user) {
								console.log(user.likes.length);
								expect(user.likes).to.have.length(0);
								done();
							})
						});
					});
				});
			});
		});
	});
});

