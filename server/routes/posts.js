const express = require('express');
const { createPostQuery } = require('../../db/queries/post');
const db = require('../../db/index');

const router = express.Router();

router.get('/singlePost/:postId', (req, res) => {
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
  const { following, userId, index } = req.body;
  console.log(req.body);
  // reduce following to a string
  let followingIds = following.reduce((accumulator, id) => {
    return accumulator + 'authorId = ' + id + ' OR ';
  }, '');
  followingIds = followingIds.substr(0, followingIds.length - 3) + `OR authorId = ${userId}`;
  const queryString = `SELECT * FROM posts WHERE ${followingIds} ORDER BY date DESC LIMIT ${index}, 5`;
  const postData = [];
  db.queryAsync(queryString)
    .then((results) => {
      // console.log(results);
      // get an array of postIds from results
      results.forEach((post, i) => {
        const postCopy = post;
        const { postId } = post;
        const likeQuery = `SELECT COUNT(*) FROM likes WHERE postId = ${postId}`;
        db.queryAsync(likeQuery)
          .then((likeCount) => {
            const count = likeCount[0]['COUNT(*)'];
            postCopy.likes = count;
            postData.push(postCopy);
          })
          .then(() => {
            const commentQuery = `SELECT COUNT(*) FROM comments WHERE postId = ${postId}`;
            db.queryAsync(commentQuery)
              .then((commentCount) => {
                postCopy.comments = commentCount[0]['COUNT(*)'];
                if (i === results.length - 1) {
                  res.send(postData);
                }
              })
              .catch((err) => {
                console.log(err, 'comments');
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      res.status(500);
    });
});

module.exports = router;
