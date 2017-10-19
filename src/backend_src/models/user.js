var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    eventId:[{ type: Schema.Types.ObjectId, ref: 'eventinfo'}]
});

module.exports = mongoose.model('user', userSchema);
