const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/COMP1640', {
  useNewUrlParser: true
});

app.use(express.json());
app.use(cors());

app.get('/ping', (req, res, next) => {
  res.status(200).jsonp({
    success: true,
    results: [],
    message: `I'm COMP1640-NODEJS`
  });
});

module.exports = app;
