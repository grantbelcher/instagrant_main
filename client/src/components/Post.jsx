import React from 'react';
import PostHeader from './PostHeader';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  container: {
    backgroundColor: 'red',
    height: '70vh',
    marginTop: '8vh',
  },
};

const Post = () => {

  return (
    <div style={styles.container}>
      <PostHeader />
    </div>
  );
};

export default Post;
