import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

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

const PostHeader = ({ post }) => {
  // const postIsMine = currentPost.authorId === currentUserId;

  // const followButton = (
  //   <div style={{ marginLeft: '1vw', fontWeight: 700 }}>
  //     *
  //     <a
  //       style={{
  //         color: '#4fa9f6',
  //         marginLeft: '1vw',
  //         }}
  //     >
  //       follow
  //     </a>
  //   </div>
  // );

  return (
    <div style={styles.container}>
      <div style={styles.avatarGroup}>
        <Avatar style={styles.avatar} src={post.profilePic} alt={post.username} />
        <div style={{ paddingLeft: '2vw' }}>
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

// const mapStateToProps = ({ auth, currentPost }) => {
//   const { user, userId } = auth;
//   return {
//     currentPost,
//     currentUser: user,
//     currentUserId: userId,
//   };
// };

export default connect(null, null)(PostHeader);
