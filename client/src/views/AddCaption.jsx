import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import LocationSearch from '../components/LocationSearch';
import { newProfilePic } from '../redux/actions/posts';

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

const AddCaption = ({ file, changeView, newProfile }) => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState(null);

  const handleShare = () => {
    newProfile(file, caption, location);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <i className="fa fa-chevron-left fa-2x" aria-hidden="true" style={styles.backIcon} onClick={() => changeView('Edit Pic')} />
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
          rowsMax={5}
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
        <img src={file} style={styles.image} />
      </div>
      <div style={{
        backgroundColor: 'rgb(230, 230, 230)',
        width: '100%',
        height: 3,
        marginTop: '-2.5vw',
      }}/>
      <LocationSearch location={location} setLocation={setLocation} />
    </div>
  );
};

const mapDispatchToProps = {
  newProfile: newProfilePic,
}

export default connect(null, mapDispatchToProps)(AddCaption);
