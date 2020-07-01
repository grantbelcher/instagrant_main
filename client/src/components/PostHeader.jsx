import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { viewProfile } from '../redux/actions/view';



// add author avatar to each post in database, or use a mysql query to pull it out simultaneously

const styles = {
  container: {
    height: '9vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: 'solid',
    borderTopWidth: 1,
    // borderTopColor: 'red',
    borderTopColor: '#bfbfbf',
  },
  avatar: {
    height: '8vw',
    width: '8vw',
    marginRight: '1vw',
    zIndex: -1,
  },
  avatarGroup: {
    display: 'flex',
    flexDirection: 'row',
    margin: '3vw',
    alignItems: 'center',
  },
};

const PostHeader = ({ post, goToProfile }) => {

  return (
    <div style={styles.container}>
      <div style={styles.avatarGroup}>
        <Avatar style={styles.avatar} src={post.profilePic} alt={post.username} />
        <div
          style={{ paddingLeft: '2vw' }}
          onClick={() => goToProfile(post.authorId)}
          >
          <a
            style={{
              fontWeight: 600,
            }}
          >
            {post.username}
          </a>
          <div style={{
            fontWeight: 300,
            marginTop: '1vw',
          }}
          >
            {post.location}
          </div>
        </div>
        {/* {postIsMine ? null : followButton} */}
      </div>
      {/* <i class="fa fa-ellipsis-h fa-lg" style={{ margin: '3vw' }} aria-hidden="true" /> */}
      <a style={{
        fontSize: 'larger',
        fontWeight: 600,
        marginRight: '3vw',
      }}
      >
        ‧‧‧
      </a>
    </div>
  );
};


const mapDispatchToProps = {
  goToProfile: viewProfile,
};

export default connect(null, mapDispatchToProps)(PostHeader);
