import React from 'react';
import { connect } from 'react-redux';
import PostHeader from './PostHeader';
import PostIcons from './PostIcons';
import PostText from './PostText';


const styles = {
  container: {
    maxHeight: '98vh',
    minHeight: '90vh',
    marginBottom: '4vh',
  },
  firstPost: {
    maxHeight: '98vh',
    minHeight: '90vh',
    marginBottom: '4vh',
    marginTop: '9vh',
  },
};

const Post = ({ post, currentUser, currentUserId, first }) => {
  console.log(post.authorId === currentUserId, 'POST IS MINE' );
  return (
    <div style={first === true ? styles.firstPost : styles.container}>
      <PostHeader post={post} />
      <img
        src={post.picture}
        style={{
          width: '96vw',
          height: '58vh',
          marginLeft: '2vw',
          marginRight: '2vw',
        }}
        alt="loading"
        />
        <PostIcons postId={post.postId}/>
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
