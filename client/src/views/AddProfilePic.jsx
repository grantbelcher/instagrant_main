import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CustomButton from '../components/CustomButton';
// import EmptyButton from '../components/EmptyButton';
import store from '../redux/index';
import NewPostButton from '../components/NewPostButton';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#eff0f1',
    top: 0,
    position: 'fixed',
    height: '8vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottom: 'solid',
    borderWidth: 'thin',
    borderColor: '#b3b4b5',
  },
  logo: {
    height: '6vh',
    width: '35%',
  },
};

const AddProfilePic = ({ changeView }) => (
  <div style={styles.container}>
    <div style={styles.header}>
      <img
        style={styles.logo}
        src="https://res.cloudinary.com/instagrant/image/upload/v1593476991/Screen_Shot_2020-06-29_at_5.20.23_PM_emrmjz.png"
        alt="logo"
      />
    </div>
    <Avatar style={{ marginTop: '25vh', height: '20vw', width: '20vw' }} />
    <div
      style={{
        marginTop: '4vh',
        fontWeight: 600,
      }}
    >
      Add a profile photo
    </div>
    <div
      style={{
        maxWidth: '75%',
        textAlign: 'center',
        marginTop: '4vh',
        color: '#939393',
      }}
    >
      Add a profile photo so your friends know its you
    </div>
    {/* <CustomButton title="Next" /> */}
    {/* <PhotoUpload /> */}
    <CustomButton title="Select a Photo" onClick={() => changeView('Edit Pic')} />
    {/* <EmptyButton /> */}
    <a
      style={{
        color: '#4fa9f6',
        marginTop: '3vh',
      }}
      onClick={() => store.dispatch({ type: 'LOG_IN' })}
    >
      Skip
    </a>
    
  </div>
);

export default AddProfilePic;
