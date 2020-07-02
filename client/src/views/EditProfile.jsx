import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import store from '../redux/index';
import { updateProfile } from '../redux/actions/view';
import CustomButton from '../components/CustomButton';

const styles = {
  header: {
    backgroundColor: '#eff0f1',
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
    borderColor: '#b3b4b5',
  },
  nextButton: {
    marginRight: '5vw',
    color: 'rgb(79, 169, 246)',
    fontWeight: 700,
    fontSize: 'large',
  },
  backIcon: {
    color: 'rgb(100, 100, 100)',
    marginLeft: '4vw',
  },
  bioInput: {
    height: '5vh',
    width: '75vw',
  },
  container: {
    marginTop: '10vh',
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    marginTop: '2vh',
    fontSize: 'smaller',
    width: '75vw',
    height: '6vh',
    borderColor: '#fafafa',
    backgroundColor: '#fafafa',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
};

const EditProfile = ({ fullname, title, bio, updateUserInfo }) => {
  const [name, setName] = useState('');
  const [myTitle, setTitle] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  useEffect(() => {
    setName(fullname);
    if (title !== null) {
      setTitle(title);
    }
    if (bio !== null) {
      setAboutMe(bio);
    }
  }, []);

  const handleSubmit = () => {
    const data = {
      name, myTitle, aboutMe,
    };
    updateUserInfo(data);
  };
  return (
    <div>
      <div style={styles.header}>
        <i
          className="fa fa-chevron-left fa-2x"
          aria-hidden="true"
          style={styles.backIcon}
          onClick={() => store.dispatch({ type: 'BACK_TO_PROFILE' })}
        />
        <div style={{
          fontSize: 'large',
        }}
        >
          Edit Profile
        </div>
        <a
          style={styles.nextButton}
          onClick={() => handleSubmit()}
        >
          Save
        </a>
      </div>
      <div const style={styles.container}>
        <div style={styles.inputContainer}>
          Edit Name:
          <Input
            id="fullName"
            label="edit name"
            variant="outlined"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={styles.inputContainer}>
          Edit Title:
          <Input
            id="Title"
            label="edit title"
            variant="outlined"
            style={styles.input}
            placeholder="Edit Title"
            value={myTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={styles.inputContainer}>
          Edit Bio
          <TextField
            id="standard-multiline-static"
            multiline
            style={styles.bioInput}
            variant="outlined"
            color="secondary"
            rows={2}
            rowsMax={3}
            placeholder="Edit Bio"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        </div>
        <CustomButton
          title="Update Avatar"
          style={{ width: '75vw', maxWidth: '75vw', marginRight: '15vw', marginLeft: '15vw' }}
          onClick={store.dispatch({ type: 'NEW_PROFILE_PIC' })}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ view }) => {
  const { profileInfo } = view;
  const { fullname, title, bio } = profileInfo;
  return {
    fullname,
    title,
    bio,
  };
};

const mapDispatchToProps = {
  updateUserInfo: updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
