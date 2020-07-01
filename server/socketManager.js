
const socketManager = (socket) => {
  socket.on('USER_CONNECTED', (userId) => {
    console.log(userId, 'yooooo');
    socket.emit('NEW_CONNECTION', userId);
  });

  // const postInfo = {
  //   upload,
  //   caption,
  //   location,
  //   userId,
  //   username: user,
  //   avatar,
  // };
  socket.on('NEW_POST_ADDED', (postInfo) => {
    const {
      userId: authorId, username, avatar: profilePic, location, upload: picture, caption, postId,
    } = postInfo;
    const post = {
      postId,
      authorId,
      username,
      profilePic,
      location,
      caption,
      picture,
      likes: 0,
      comments: 0,
    };
    // socket.emit('NEW_POST_RECIEVED', postInfo);
    socket.broadcast.emit('NEW_POST_RECIEVED', post);
  });
  socket.on('SEND_FOLLOWERS', (followStats, post) => {
    console.log(followStats, post, 'follow stats');
    const following = followStats.following.includes(post.authorId);
    socket.emit('CHECK_FOLLOW', following, followStats);
  });
};

module.exports = socketManager;
