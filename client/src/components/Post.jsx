import React from 'react';
import { connect } from 'react-redux';
import PostHeader from './PostHeader';
import PostIcons from './PostIcons';
import PostText from './PostText';


const styles = {
  container: {
    height: '90vh',
    maxHeight: '100vh',
    marginBottom: '8vh',
  },
};

const Post = ({ post, currentUser, currentUserId }) => {
  return (
    <div style={styles.container}>
      <PostHeader post={post} />
      <img
        src={post.picture}
        style={{
          width: '100vw',
          height: '62vh',
        }}
        />
        <PostIcons />
        <PostText post={post} />
    </div>
  );
};

// const mapStateToProps = ({ auth }) => {
//   const { user, userId } = auth;
//   return {
//     // post: currentPost,
//     currentUser: user,
//     currentUserId: userId,
//   };
// };

export default connect(null, null)(Post);
