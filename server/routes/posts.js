const express = require('express');
const { createPostQuery } = require('../../db/queries/post');
const db = require('../../db/index');

const router = express.Router();

router.get('/:postId', (req, res) => {
  const { postId } = req.params;
  console.log(postId)
  const queryString = `SELECT * FROM posts WHERE postId = ${postId}`;
  db.queryAsync(queryString)
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send('error');
    });
});

router.post('/upload-image', (req, res) => {
  const queryString = createPostQuery(req.body);
  db.queryAsync(queryString)
    .then((result) => {
      res.status(200);
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

router.get('/myFeed/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(req.body, userId);
  res.send('reviedcd');
});

module.exports = router;
