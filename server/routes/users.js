const express = require('express');
const db = require('../../db/index');

const router = express.Router();

router.get('/suggestions', (req, res) => {
  const queryString = 'SELECT username, fullname, userId, photo FROM users LIMIT 10';
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
  const queryString = `SELECT username, fullname, userId, photo FROM users WHERE username OR fullname LIKE '%${query}%'`;
  db.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log(results);
      res.send(results);
    }
  });

  // router.get()
  // db.queryAsync(queryString)
  //   .then((results) => {
  //     console.log(results);
  //     res.send(results);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send('error');
  //   });
});


module.exports = router;
