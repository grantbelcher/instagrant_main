import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CustomButton from '../components/CustomButton';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backIcon: {
    color: 'rgb(100, 100, 100)',
    marginLeft: '5vw',
  },
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
  footer: {
    backgroundColor: '#eff0f1',
    bottom: 0,
    position: 'fixed',
    height: '10vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 5,
    borderTop: 'solid',
    borderWidth: 'thin',
    borderColor: '#b3b4b5',
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    height: '20%',
    alignItems: 'center',
    marginTop: '1vh',
  },
  input: {
    marginTop: '1vh',
    fontSize: 'x-small',
    width: '75vw',
    height: '10vh',
    borderColor: '#fafafa',
    backgroundColor: '#fafafa',
  },
};

const Register = ({ changeView }) => (
  <div style={styles.container}>
    <div style={styles.header}>
      <i className="fa fa-chevron-left fa-2x" aria-hidden="true" style={styles.backIcon} onClick={() => changeView('Log In')} />
      <div style={{
        marginRight: '44vw',
      }}
      >
        Register
      </div>
    </div>
    <div style={{
      marginTop: '15vh',
      fontWeight: 600,
    }}
    >
      Enter name and password
    </div>
    <div style={{
      marginTop: '3vh',
      color: '#939393',
    }}
    >
      Add your name so friends can find you.
    </div>
    <div style={styles.inputs}>
      <TextField id="username" variant="outlined" style={styles.input} placeholder="Full Name" />
      <TextField id="username" variant="outlined" style={styles.input} placeholder="Username" />
      <TextField id="password" variant="outlined" style={styles.input} placeholder="Password" />
    </div>
    <CustomButton title="Next" />
    <div style={styles.footer}>
      <div style={{
        color: '#8e8e8e',
        marginTop: '1vh',
        fontSize: 'smaller',
      }}
      >
        from
      </div>
      <div style={{
        marginTop: '1vh',
        fontSize: 'small',
      }}
      >
        GRANTBOOK
      </div>
    </div>
  </div>
);

export default Register;
