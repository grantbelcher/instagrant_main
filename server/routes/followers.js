const express = require('express');

const router = express.Router();

router.get('/myFollowers/:userId', async (req, res) => {
  const { userId } = req.params;
  res.send('it worked!');
});

module.exports = router;
