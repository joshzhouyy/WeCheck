var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    event_id:[{ type: Schema.Types.ObjectId, ref: 'Event'}]
});

module.exports = mongoose.model('User', userSchema);
