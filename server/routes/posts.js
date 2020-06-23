const express = require('express');
const { createPostQuery } = require('../../db/queries/post');
const db = require('../../db/index');

const router = express.Router();

router.post('/upload-image', (req, res) => {
  const queryString = createPostQuery(req.body);
  db.queryAsync(queryString)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err, 'error');
    });
  res.send('yoooo');
});

module.exports = router;
