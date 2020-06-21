import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CustomButton from '../components/CustomButton';
import store from '../redux/index';

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

const AddProfilePic = () => (
  <div style={styles.container}>
    <div style={styles.header}>
      <img
        style={styles.logo}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
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
    <CustomButton title="Next" />
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
