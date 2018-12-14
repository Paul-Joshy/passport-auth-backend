const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const transactionSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    required: true,
    type: String
  },
  type: {
    type: String
  },
  amount: {
    type: Number
  }

});


// Create a model
const TransactionModel = mongoose.model('expense', transactionSchema);

// Export the model
module.exports = TransactionModel;