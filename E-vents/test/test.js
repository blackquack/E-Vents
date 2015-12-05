var supertest = require("supertest");
var should = require('chai').should();
var expect = require("chai").expect;

var server = supertest("http://localtest:3000");

describe("Post Test", function() {
	before(function() {

	});

	it("should return a 200 response", function(done) {
		server
		.get('/api/post/all')
		.expect(200, function(err, res) {
			done();
		});
	});

	it("should create a proper event", function(done) {
		server
		.post('/api/post/register')
		.send({
			name: "Test Event",
        	description: "New event description",
        	location: "Toronto",
        	date: Date.now(),
        	cost: 5,
        	games: ["Game-1", "Game-2"],
        	creator: "TestUser",
        	attendance: ["TestUser"]
		})
		.expect(200)
		.end(function(err, res) {
			console.log(res);
			done();
		});
	});
});