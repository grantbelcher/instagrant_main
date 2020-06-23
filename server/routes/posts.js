const express = require('express');
const { createPostQuery } = require('../../db/queries/post');
const db = require('../../db/index');

const router = express.Router();

router.post('/upload-image', (req, res) => {
  const queryString = createPostQuery(req.body);
  db.queryAsync(queryString)
    .then((result) => {
      console.log(result, 'result from post');
    })
    .catch((err) => {
      console.log(err, 'error');
    });

});
router.post('/new_avatar', (req, res) => {
  const queryString = createPostQuery(req.body);
  db.queryAsync(queryString)
    .then((result) => {
      db.queryAsync(`UPDATE users SET photo = "${req.body.picture}" WHERE userId = ${req.body.authorId}`)
        .then((data) => {
          return res.status(200).json({ avatar: req.body.picture });
        })
        .catch((err) => {
          return res.status(401);
        });
    })
    .catch((err) => {
      return res.status(500);
    });
});

module.exports = router;
