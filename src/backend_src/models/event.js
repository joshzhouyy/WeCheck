var mongoose = require('mongoose');

var event = new mongoose.Schema({
    eventname: {type: String, unique: true},
    status: {
    	type: String,
    	enum: ['inprocess','finished']
    },
    type: {
    	type: String,
    	enum: ['public','private']
    },
    category: {
    	ype: String,
    	enum: ['restaurant','hotel', 'flight']
    }
});

module.exports = mongoose.model('event', event);