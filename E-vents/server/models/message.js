var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	from: String,
	to: String,
	date: Date,
<<<<<<< HEAD
	message: String 
});

module.exports = mongoose.model('Message', MessageSchema);
=======
	message: String
});

module.exports = mongoose.model('Message', MessageSchema);
>>>>>>> a903f0e4a4dfe1f79992c8beac245e332f62c507
