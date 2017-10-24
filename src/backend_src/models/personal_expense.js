var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personalExpenseSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'user'},
    expenseCategory: String,
    expense: Number,
    expenseDate: {type: Date, default: new Date()},
    expenseNote: String
});

module.exports = mongoose.model('personalExpense', personalExpenseSchema);
