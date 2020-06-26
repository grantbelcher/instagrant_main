const express = require('express');
const db = require('../../db/index');

const router = express.Router();

router.get('/myFollowers/:userId', async (req, res) => {
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

module.exports = router;
