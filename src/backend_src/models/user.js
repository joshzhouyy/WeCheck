var mongoose = require('mongoose');

var user = new mongoose.Schema({
    username: {type: String, unique: true},
    email: String,
    password: String
});

module.exports = mongoose.model('user', user);
