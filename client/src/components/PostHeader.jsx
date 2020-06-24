import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

// add author avatar to each post in database, or use a mysql query to pull it out simultaneously

const styles = {
  container: {
    backgroundColor: 'aliceblue',
    height: '9vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    height: '8vw',
    width: '8vw',
    marginRight: '1vw'
  },
  avatarGroup: {
    display: 'flex',
    flexDirection: 'row',
    margin: '3vw',
    alignItems: 'center',
  },
};

const PostHeader = ({ currentPost, currentUser, currentUserId }) => {
  const postIsMine = currentPost.authorId === currentUserId;

  const followButton = (
    <div style={{ marginLeft: '1vw', fontWeight: 700 }}>
      *
      <a
        style={{
          color: '#4fa9f6',
          marginLeft: '1vw',
          }}
      >
        follow
      </a>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.avatarGroup}>
        <Avatar style={styles.avatar} />
        <a
          style={{
            paddingLeft: '2vw',
            fontWeight: 600
            }}
        >
          {currentPost.username}
        </a>
        {postIsMine ? null : followButton}
      </div>
      <i class="fa fa-heart-o fa-lg" style={{ margin: '3vw' }} aria-hidden="true">...</i>
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

export default connect(mapStateToProps, null)(PostHeader);
