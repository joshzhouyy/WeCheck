var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new mongoose.Schema({
    eventname: {type: String, unique: true},
    owner_id: [{ type: Schema.Types.ObjectId, ref: 'User'}],
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
    member_id:[{ type: Schema.Types.ObjectId, ref: 'User'}],
    total: Number
});

module.exports = mongoose.model('Event', eventSchema);