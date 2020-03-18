const MessageModel = require('../models/Message');

async function saveMessage(req, res, next) {
  const data = req.body;

  const newMessage = new MessageModel(data);

  await newMessage.save();

  res.status(201).jsonp({
    success: true,
    reuslts: newMessage,
    message: 'Add successfully'
  });
}

module.exports = {
  saveMessage
};
