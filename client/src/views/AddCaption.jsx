import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import LocationSearch from '../components/LocationSearch';
import { newProfilePic, newPost, updateProfilePic } from '../redux/actions/posts';
import store from '../redux/index';
import SocketContext from '../context/index';


const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#eff0f1',
    top: 0,
    // position: 'fixed',
    height: '8vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottom: 'solid',
    borderWidth: 'thin',
    borderColor: '#b3b4b5',
  },
  backIcon: {
    color: 'rgb(100, 100, 100)',
    marginLeft: '4vw',
  },
  nextButton: {
    marginRight: '5vw',
    color: 'rgb(79, 169, 246)',
    fontWeight: 700,
    fontSize: 'large',
  },
  image: {
    height: '10vh',
    width: '10vh',
    borderRadius: '5px',
  },
};


const AddCaption = ({
  file, upload, changeView, newProfile, addNewPost, inRegistration, userId, user, avatar, newAvatar, updateAvatar,
}) => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState(null);

  const connection = useContext(SocketContext);

  useEffect(() => {
    console.log(newAvatar, 'NEW AVATAR FUCK ME');
  }, []);

  const handleShare = () => {
    if (inRegistration) {
      newProfile(file, caption, location);
      setTimeout(() => {
        store.dispatch({
          type: 'VIEW_FEED',
        });
      }, 1000);
    } else if (newAvatar) {
      console.log('yoooo');
      // / call action to update avatar
      updateAvatar(upload, caption, location);
    } else {
      // emit this info to socket;
      let postInfo;
      axios.get('/posts/lastPost')
        .then((result) => {
          const { data } = result;
          console.log(data, 'postId before SOCKETS!!! ');
          let { postId } = data;
          postId += 1;
          console.log(postId);
          postInfo = {
            caption,
            location,
            userId,
            username: user,
            postId,
          };
          if (inRegistration) {
            postInfo.upload = file;
            postInfo.avatar = file;
            connection.emit('NEW_POST_ADDED', postInfo);
            addNewPost(upload, caption, location);
          } else {
            postInfo.upload = upload;
            postInfo.avatar = avatar;
            connection.emit('NEW_POST_ADDED', postInfo);
            addNewPost(upload, caption, location);
          }
          store.dispatch({
            type: 'VIEW_FEED',
          }, 1000);
        })
        .catch((err) => {
          console.log(err, 'ERR GETTING LAST POST');
        });
    }
  };

  const handleBack = () => {
    if (inRegistration) {
      changeView('Edit Pic');
    } else if (newAvatar) {
      store.dispatch({
        type: 'BACK_TO_PROFILE',
      });
    } else {
      store.dispatch({
        type: 'VIEW_FEED',
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <i className="fa fa-chevron-left fa-2x" aria-hidden="true" style={styles.backIcon} onClick={() => handleBack()} />
        <div style={{
          fontSize: 'large',
        }}
        >
          New Post
        </div>
        <a
          style={styles.nextButton}
          onClick={() => handleShare()}
        >
          Share
        </a>
      </div>
      <div style={{
        width: '90%',
        height: '12vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2vh',
      }}
      >
        <TextField
          id="standard-multiline-static"
          multiline
          color="secondary"
          rows={3}
          rowsMax={3}
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
          placeholder="Write a caption..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  alt="test"
                  style={{
                    height: '10vw',
                    width: '10vw',
                    marginBottom: '4vw',
                    marginRight: '4vw',
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
        {inRegistration ? <img src={file} style={styles.image} /> : <img src={upload} style={styles.image} />}
      </div>
      <div style={{
        backgroundColor: 'rgb(230, 230, 230)',
        width: '100%',
        height: 3,
        marginTop: '-2.5vw',
      }}
      />
      <LocationSearch location={location} setLocation={setLocation} />
    </div>
  );
};

const mapStateToProps = ({ upload, auth }) => ({
  upload,
  userId: auth.userId,
  user: auth.user,
  avatar: auth.avatar,
});

const mapDispatchToProps = {
  newProfile: newProfilePic,
  addNewPost: newPost,
  updateAvatar: updateProfilePic,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCaption);
