var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    userName: String,
    userAccount: {type: String, unique: true},
    password: String,
    //list that contains all event that a user owns or in
    eventList:[{ type: Schema.Types.ObjectId, ref: 'eventinfo'}],
    pendingInvites:[{type: Schema.Types.ObjectId, ref: 'eveninfo'}]
});

module.exports = mongoose.model('user', userSchema);