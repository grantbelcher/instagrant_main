const express = require('express');
const db = require('../../db/index');

const router = express.Router();

router.get('/:query', (req, res) => {
  const { query } = req.params;
  console.log(query)
  // AND body LIKE '%${search}%'
  const queryString = `SELECT * FROM users WHERE username LIKE '%${query}%'`;
  db.query(queryString, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(results)
      res.send(results)
    }
  })
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
