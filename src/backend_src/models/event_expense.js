var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventExpenseSchema = new mongoose.Schema({
    eventID: { type: Schema.Types.ObjectId, ref: 'eventInfo'},
    userID: { type: Schema.Types.ObjectId, ref: 'user'},
    individualAmount: Number

});

module.exports = mongoose.model('eventExpense', eventExpenseSchema);