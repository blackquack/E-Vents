var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	from: String,
	to: String,
	date: Date,
	message: String
});

module.exports = mongoose.model('Message', MessageSchema);