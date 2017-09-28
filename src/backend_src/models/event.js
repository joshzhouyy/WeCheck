var mongoose = require('mongoose');

var event = new mongoose.Schema({
    eventname: {type: String, unique: true},
    owner: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    status_a: {
    	type: String,
    	enum: ['inprocess','finished']
    },
    type_a: {
    	type: String,
    	enum: ['public','private']
    },
    category: {
    	type: String,
    	enum: ['restaurant','hotel', 'flight']
    }
    member:[{ type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('event', event);