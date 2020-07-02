const express = require('express');
const { createPostQuery } = require('../../db/queries/post');
const db = require('../../db/index');

const router = express.Router();

router.get('/singlePost/:postId', (req, res) => {
  const { postId } = req.params;
  console.log(postId);
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

router.get('/lastPost', (req, res) => {
  db.queryAsync('SELECT postId FROM posts ORDER BY postId DESC LIMIT 1;')
    .then((result) => {
      console.log(result, 'result from last post query');
      res.send(result[0]);
    })
    .catch((err) => {
      console.log(err, 'ERRRRRRRR fetching last post');
      return res.send(500);
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
        .then((data) => res.status(200).json({ avatar: req.body.picture }))
        .catch((err) => res.status(401));
    })
    .catch((err) => res.status(500));
});

router.post('/updateAvatar', (req, res) => {
  console.log(req.body);
  const {
    username, authorId, picture, caption, location,
  } = req.body;
  // define queryString to update picture in user;
  const newPostQuery = createPostQuery({
    username, authorId, profilePic: picture, picture, caption, location,
  });
  const queryUsers = `UPDATE users SET photo = "${picture}" WHERE userId = ${authorId};`;
  const queryPosts = `UPDATE posts SET profilePic = "${picture}" WHERE authorId = ${authorId};`;
  db.queryAsync(newPostQuery)
    .then((result) => {
      db.queryAsync(queryUsers)
        .then((data) => {
          console.log(data, 'AFTER CHANING USER');
          db.queryAsync(queryPosts)
            .then((output) => {
              console.log(output, 'AFTER UPDATING ALL POSTS');
              res.status(200).send('success');
            })
            .catch((err) => {
              console.log(err, 'ERROR UPDATING ALL POSTS');
              return res.status(500);
            });
        })
        .catch((err) => {
          console.log(err, 'ERROR UPDATING USER ON NEW POST');
          return res.status(500);
        });
    })
    .catch((err) => {
      console.log(err, 'ERROR INSERTING NEW POST');
      return res.status(500);
    });
});

router.post('/myFeed', (req, res) => {
  const { following, userId, index } = req.body;
  let followingIds = following.reduce((accumulator, id) => `${accumulator}authorId = ${id} OR `, '');
  followingIds = `${followingIds.substr(0, followingIds.length - 3)}OR authorId = ${userId}`;
  const queryString = `SELECT * FROM posts WHERE ${followingIds} ORDER BY date DESC LIMIT ${index}, 5`;
  const postData = [];
  db.queryAsync(queryString)
    .then((results) => {
      // console.log(results);
      // get an array of postIds from results
      if (results.length === 0) {
        return res.send([]);
      }
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

router.post('/userFeed', (req, res) => {
  const { authorId, index } = req.body;
  console.log(authorId, index);
  const queryString = `SELECT * FROM posts WHERE authorId = ${authorId} ORDER BY date DESC LIMIT ${index}, 5`;
  const postData = [];
  db.queryAsync(queryString)
    .then((data) => {
      if (data.length === 0) {
        return res.send([]);
      }
      data.forEach((post, i) => {
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
                if (i === data.length - 1) {
                  return res.send(postData);
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
      console.log(err, 'ERROR GETTING PROFILE POSTS');
    });
});

module.exports = router;
