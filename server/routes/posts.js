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

router.post('/myFeed', (req, res) => {
  const { following, userId, page } = req.body;

  // SELECT all following Ids where Follower = userId
    // returns array of all accounts i am following
    // join the ids together in a string that is compatible with MYSQL format for selecting Where value = x OR y OR z
        // maybe do this on the initial loading???
    // add string of ids into a query SELECT * FROM posts WHERE authorId = USE ABOVE QUERY START = 
  // db.queryAsync()
  res.send('reviedcd');
});

module.exports = router;
