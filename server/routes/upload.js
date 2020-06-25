const express = require('express');
const Promise = require('bluebird');

const router = express.Router();
// const UserCtrl = require('../controllers/user');

const upload = require('../services/upload');

const singleUpload = upload.single('image');

router.post('/image-upload', (req, res) => {
  singleUpload(req, res, (err) => {
    console.log(req.files, 'yoooo')

    return res.json({ imageUrl: req.file.location });
  });
});

router.put('/test/image-upload', function(req, res) {
  singleUpload(req, res, function(err) {
    console.log(req.file, 'yooooo')
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }

    return res.json({'imageUrl': req.file.location});
  });
});

module.exports = router;
