const express = require('express');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { createUserQuery } = require('../../db/queries/users');
const db = require('../../db/index');
const { route } = require('./posts');

Promise.promisifyAll(db);
const router = express.Router();

// test router
router.get('/', (req, res) => {
  db.queryAsync('SELECT * FROM users')
    .then((data) => res.send(data))
    .catch((err) => console.error(err.message));
});

// router.get('/profile', auth, async (req, res) => {
//   try {
//     const { user: id } = req;
//     const user = await User.findById(id).select('-password');
//     if (!user) return res.status(404).json({ message: 'cannot find user' });
//     return res.json({ user });
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ message: 'server error' });
//   }
// });


router.post(
  '/SignUp',
  [
    check('username').isLength({ min: 5 }),
    check('fullName').isLength({ min: 1 }),
    check('password').isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { username, fullName, password } = req.body;
    db.queryAsync(`SELECT username FROM users WHERE username = "${username}"`)
      .then((matches) => {
        if (matches.length) {
          res.statusMessage = 'user already exists';
          return res.status(401).end();
        }
        const queryString = createUserQuery({ username, fullName, password });
        db.queryAsync(queryString)
          .then((data) => {
            db.queryAsync(`SELECT * from users WHERE userId = "${data.insertId}"`)
              .then((result) => {
                console.log(result[0], 'response from sql query');
                const { userId, username: user } = result[0];
                const token = jwt.sign({ userId }, 'secret', { expiresIn: '1h' });
                return res.json({ token, username: user, userId });
              });
          })
          // add user as a follower of yourself // start following grant
          .catch((err) => {
            console.error(err.message);
            res.status(500).json({ message: 'server error' });
          });
      })
      .catch((err) => {
        console.error(err, 'ERRRRRRRRR');
        return res.status(500).json({ message: 'server error' });
      });
  },
);

router.post('/token', (req, res) => {
  const { token } = req.body;
  const payload = jwt.decode(token, 'secret');
  const { id } = payload;
  if (!id) return res.status(401).json({ message: 'token required' });
  console.log(token, id, 'FUCK MEEEEEEEEEE');
});

router.post(
  '/signin',
  [
    check('username').exists(),
    check('password').exists(),
  ],
  (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    let user;
    db.queryAsync(`SELECT * FROM users WHERE username = "${username}";`)
      .then((item) => {
        const userInfo = item[0];
        return userInfo;
      })
      .then((userInfo) => {
        let codesMatch = (password === userInfo.password);
        if (codesMatch) {
          const token = jwt.sign({ userId: userInfo.userId }, 'secret', { expiresIn: '1h' });
          return res.json({ token, username: userInfo.username, userId: userInfo.userId, avatar: userInfo.photo });
        } else {
          return res.status(401).json({ message: 'invalid credentials' })
        }
      })
      .catch((err) => {
        console.error(err.message)
        return res.status(401).json({ message: 'invalid credentials' })
      })
  },
);


module.exports = router;
