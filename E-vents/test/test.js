var supertest = require("supertest");
var should = require('chai').should();
var expect = require("chai").expect;

var server = supertest.agent("http://localtest:3000");

describe("Post Test", function(done) {
	it("should return a 200 response", function(done) {
		server
		.get('/api/post/all')
		.expect(200, done);
	});
});