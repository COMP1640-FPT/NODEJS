const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const messageController = require('./controllers/message.controller')

const app = express();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});

app.use(express.json());
app.use(cors());

app.post('/messages', messageController.saveMessage)

app.get('/ping', (req, res, next) => {
  res.status(200).jsonp({
    success: true,
    results: [],
    message: `I'm COMP1640-NODEJS`
  });
});

module.exports = app;
