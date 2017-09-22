var mongoose = require('mongoose');

var category = new mongoose.Schema({
    categoryname: {type: String, unique: true}
});

module.exports = mongoose.model('category', category);
