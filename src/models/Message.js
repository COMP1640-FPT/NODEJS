const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  receiver: {
    type: String,
    required: 'Receiver is required'
  },
  sender: {
    type: String,
    required: 'Sender is required'
  },
  text: {
    type: String,
    maxlength: 500,
    required: 'Text is required'
  }
});

module.exports = mongoose.model('Message', messageSchema);
