const express = require('express');
const db = require('../../db/index');

const router = express.Router();

router.get('/myLikes/:userId', (req, res) => {
  const { userId } = req.params;

  const data = {};
  console.log(userId);
  db.queryAsync(`SELECT postId FROM likes WHERE userId = ${userId}`)
    .then((results) => res.send(results))
    .catch((err) => {
      console.log(err, 'first query');
    });
});

router.post('/likePost/:postId/:userId', (req, res) => {
  let { postId, userId } = req.params;
  postId = parseInt(postId);
  userId = parseInt(userId);
  console.log(userId, 'following Id before query');
  db.queryAsync(`INSERT INTO likes (postId, userId) VALUES (${postId}, ${userId})`)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('err');
    });
});

router.delete('/unfollow', (req, res) => {
  const { postId, userId } = req.body;
  // postId = parseInt(postId);
  // userId = parseInt(userId);
  db.queryAsync(`DELETE FROM likes WHERE postId = ${postId} AND userId = ${userId}`)
    .then((result) => {
      console.log(result, 'result from delete');
      return res.send('success');
    })
    .catch((err) => {
      console.log(err, 'err from delete');
      res.status(500);
    });
});

module.exports = router;
