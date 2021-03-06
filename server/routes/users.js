const express = require('express');
const db = require('../../db/index');

const router = express.Router();

router.get('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  const queryString = `SELECT userId, username, fullname, photo, title, bio FROM users where userId = ${userId}`;
  db.queryAsync(queryString)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500);
    });
});

router.get('/suggestions', (req, res) => {
  const queryString = 'SELECT username, fullname, userId, photo FROM users order by rand() LIMIT 15';
  db.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

router.get('/search/:query', (req, res) => {
  const { query } = req.params;
  console.log(query);
  // AND body LIKE '%${search}%'
  const queryString = `SELECT username, fullname, userId, photo FROM users WHERE username LIKE '%${query}%' OR fullname LIKE '%${query}%'`;
  db.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

router.patch('/updateProfile', (req, res) => {
  const { userId, fullname, title, bio } = req.body;
  const queryString = `UPDATE users SET fullname = "${fullname}", title = "${title}", bio = "${bio}" WHERE userId = ${userId};`;
  db.queryAsync(queryString)
    .then((result) => {
      console.log(result);
      return res.send('success');
    })
    .catch((err) => {
      console.log(err, 'ERRROR UPDATING USER INFO');
      return res.status(500);
    });
});


module.exports = router;
