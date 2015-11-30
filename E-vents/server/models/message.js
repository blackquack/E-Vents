var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	from: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	to: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	date: Date,
	message: String 
});

module.exports = mongoose.model('Message', MessageSchema);