const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const transactionDetails = new Schema({
  user_id: {
    required: true,
    type: ObjectId
  },
  transactionDetails: {

  }

});


// Create a model
const ExpenseModel = mongoose.model('expense', expenseSchema);

// Export the model
module.exports = ExpenseModel;