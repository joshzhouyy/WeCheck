var mongoose = require('mongoose');

var event = new mongoose.Schema({
    eventname: {type: String, unique: true},
    status: {
    	type: String,
    	enum: ['inprocess','finished']
    }
    type: {
    	type: String,
    	enum: ['public','private']
    }
    category:[{ type: Schema.Types.ObjectId, ref: 'Category'}]
});

module.exports = mongoose.model('event', event);