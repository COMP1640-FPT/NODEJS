const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const aws = require('aws-sdk');
const messageController = require("./controllers/message.controller");
const multer = require("multer");
const { makeid, uploadFileToS3 } = require("./libs/helper");
const { CORE } = require("./constants")
const app = express();

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});

const s3 = new aws.S3({
  accessKeyId: CORE.ACCESS_KEY_ID_S3,
  secretAccessKey: CORE.SECRET_ACCESS_KEY_S3
});

app.use(express.json());
app.use(cors());

app.post("/messages", messageController.saveMessage);

app.post(
  "/users/upload-avatar",
  upload.single("avatar"),
  async (req, res, next) => {
    const extFile = req.file.originalname.split('.').pop()
    const filename = [makeid(20), extFile].join('.')

    const avatar = await uploadFileToS3(s3, {
      Bucket: 'codingame',
      Key: `users/avatar/${filename}`,
      ACL: 'public-read',
      ContentType: req.file.mimetype,
      Body: req.file.buffer
    });

    res.status(200).json({
      success: true,
      results: {
        imageUrl: avatar
      },
      message: "Upload file successfully!"
    });
  }
);

app.post(
  "/requests/upload-file",
  upload.single("file"),
  async (req, res, next) => {
     console.log(req.file)
    const extFile = req.file.originalname.split('.').pop()
    const filename = [makeid(20), extFile].join('.')

    const file = await uploadFileToS3(s3, {
      Bucket: 'codingame',
      Key: `requests/files/${filename}`,
      ACL: 'public-read',
      ContentType: req.file.mimetype,
      Body: req.file.buffer
    });

    res.status(200).json({
      success: true,
      results: {
        url: file
      },
      message: "Upload file successfully!"
    });
  }
);

app.get("/api/ping", (req, res, next) => {
  res.status(200).jsonp({
    success: true,
    results: null,
    message: `I'm COMP1640-NODEJS`
  });
});

module.exports = app;
