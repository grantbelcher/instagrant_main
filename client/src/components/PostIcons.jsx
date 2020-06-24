import React from 'react';

const styles = {
  container: {
    height: '5vh',
    display: 'flex',
    flexDirection: 'row',
    padding: '3vw',
    justifyContent: 'space-between',
    fontSize: 'larger',
  },
  icon: {
    margin: '2vw',
  },
};

const PostIcons = () => {
  console.log('yp');
  return (
    <div style={styles.container}>
      <div>
        <i class="fa fa-heart-o fa-lg" aria-hidden="true" style={styles.icon} />
        <i class="fa fa-comment-o fa-lg" aria-hidden="true" style={styles.icon} />
        <i class="fa fa-paper-plane-o fa-lg" aria-hidden="true" style={styles.icon} />
      </div>
      <div>
        <i class="fa fa-bookmark-o fa-lg" aria-hidden="true" style={styles.icon}/>
      </div>
    </div>
  );
};

export default PostIcons;
