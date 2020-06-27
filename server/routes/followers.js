const express = require('express');
const db = require('../../db/index');
const { Select } = require('@material-ui/core');

const router = express.Router();

router.get('/myFollowers/:userId', (req, res) => {
  const { userId } = req.params;

  const data = {};

  db.queryAsync(`SELECT * FROM relationships WHERE followerId = ${userId}`)
    .then((results) => {
      data.myFollowers = results;
    })
    .then(() => {
      db.queryAsync(`SELECT * FROM relationships WHERE followingId = ${userId}`)
        .then((info) => {
          data.following = info
          res.send(data);
        })
        .catch((err) => {
          console.log(err, 'second query');
        });
    })
    .catch((err) => {
      console.log(err, 'first query');
    });
});

router.post('/addFollower/:followerId/:followingId', (req, res) => {
  let { followerId, followingId } = req.params;
  followerId = parseInt(followerId);
  followingId = parseInt(followingId);
  console.log(followerId + followingId);
  db.queryAsync(`INSERT INTO relationships (followerId, followingId) VALUES (${followerId}, ${followingId})`)
    .then((data) => {
      db.queryAsync(`SELECT followingId FROM relationships WHERE followerId = ${followerId} AND followingId = ${followingId}`)
        .then((result) => {
          res.send(result[0]);
        })
        .catch((err) => {
          console.log(err, 'second catch');
          res.status(500).send('err');
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send('err');
    });
});

module.exports = router;
