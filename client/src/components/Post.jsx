import React from 'react';
import { connect } from 'react-redux';
import PostHeader from './PostHeader';
import PostIcons from './PostIcons';


const styles = {
  container: {
    backgroundColor: 'red',
    height: '82vh',
    marginTop: '8vh',
  },
};

const Post = (currentPost, currentUser, currentUserId) => {

  return (
    <div style={styles.container}>
      <PostHeader />
      <img
        src={currentPost.picture}
        style={{
          backgroundColor: 'violet',
          width: '100vw',
          height: '62vh',
        }}
        />
        <PostIcons />
    </div>
  );
};

const mapStateToProps = ({ auth, currentPost }) => {
  const { user, userId } = auth;
  return {
    currentPost,
    currentUser: user,
    currentUserId: userId,
  };
};

export default connect(mapStateToProps, null)(Post);
