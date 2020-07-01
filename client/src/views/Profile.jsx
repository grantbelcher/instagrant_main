import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import store from '../redux/index';
import Footer from '../components/Footer';
import FollowButton from '../components/FollowButton';

const styles = {
  header: {
    backgroundColor: '#d6d6d6',
    top: 0,
    position: 'fixed',
    height: '8vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottom: 'solid',
    borderWidth: 'thin',
    borderColor: 'white',
  },
  logo: {
    height: '6vh',
    width: '35%',
  },
  banner: {
    paddingLeft: '3vw',
    paddingRight: '5vw',
    paddingTop: '13vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  col2: {
    display: 'flex',
    flexDirection: 'column',
  },
  row1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '1vh',
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fakeButton: {
    display: 'flex',
    flexDirection: 'column',
    height: '6vh',
    width: '6vh',
    borderRadius: 5,
    border: 'solid',
    borderWidth: 'thin',
    borderColor: '#abaab7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '4vw',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '7vw',
    marginTop: '4vh',
    maxWidth: '64vw',
  },
  fullName: {
    fontSize: 'large',
    fontWeight: 560,
    marginBottom: '1vw',
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3vh',
    height: '10vh',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: 'solid',
    borderBottom: 'solid',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgb(191, 191, 191)',
    borderBottomColor: 'rgb(191, 191, 191)',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  statsTop: {
    textAlign: 'center',
    fontSize: 'large',
    fontWeight: 500,
  },
  statsBottom: {
    fontWeight: 400,
    fontSize: 'small',
    color: 'gray',
  },
};
// margin-top: 3vh;
//     height: 10vh;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-around;


// WORD LIMIT ON BIO => 100

const Profile = ({ profileInfo }) => {
  const {
    followers, following, photo, title, username, fullname, bio, posts,
  } = profileInfo;
  return (
    <div>
      <div style={styles.header}>
        <i className="fa fa-camera fa-lg" aria-hidden="true" style={{ marginLeft: '4vw' }} onClick={() => store.dispatch({ type: 'ADD_POST' })} />
        <img
          style={styles.logo}
          src="https://res.cloudinary.com/instagrant/image/upload/v1593545227/Screen_Shot_2020-06-30_at_12.26.59_PM_jtacwi.png"
          alt="logo"
        />
        <i className="fa fa-paper-plane-o fa-lg" aria-hidden="true" style={{ marginRight: '4vw' }} />
      </div>
      <div style={styles.banner}>
        <Avatar src={photo} style={{ height: '20vw', width: '20vw' }} />
        <div style={styles.col2}>
          <div style={styles.row1}>
            <div style={{ fontSize: 'x-large', fontWeight: 400, marginRight: 4 }}>{username}</div>
            <i className="fa fa-check-circle" aria-hidden="true" style={{ marginBottom: '2vh', color: '#4fa9f6' }} />
            <div style={{ fontSize: 'x-large', paddingLeft: '3vw', fontWeight: 700 }}>‧‧‧</div>
          </div>
          <div style={styles.row2}>
            <FollowButton />
            <div style={styles.fakeButton}>
              <i className="fa fa-chevron-down" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.userInfo}>
        <div style={styles.fullName}>{fullname}</div>
        <div style={{ fontWeight: 500, marginBottom: '1vw', fontSize: 'smaller' }}>{title}</div>
        <div style={{ fontSize: 'smaller' }}>{bio}</div>
      </div>
      <div style={styles.stats}>
        <div style={styles.statBox}>
          <div style={styles.statsTop}>
            {posts}
            <div style={styles.statsBottom}>posts</div>
          </div>
        </div>
        <div style={styles.statBox}>
          <div style={styles.statsTop}>
            {followers.length}
            <div style={styles.statsBottom}>followers</div>
          </div>
        </div>
        <div style={styles.statBox}>
          <div style={styles.statsTop}>
            {following.length}
            <div style={styles.statsBottom}>following</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// { /* <Avatar src={photo} />
// <div>
//   {`${fullname},  ${username}, ${title}, ${bio}`}
//   {`${posts} posts, ${followers.length} followers, ${following.length} following`}
// </div>
// */ }


const mapStateToProps = ({ view }) => {
  const { profileInfo } = view;
  return {
    profileInfo,
  };
};

export default connect(mapStateToProps, null)(Profile);
