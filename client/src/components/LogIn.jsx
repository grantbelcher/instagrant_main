import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import CustomButton from './CustomButton';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    height: '30%',
    width: '60%',
    paddingTop: '30%',
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
    marginTop: '5vh',
  },
  input: {
    marginTop: '1vh',
    // paddingTop: '1vh',
    // paddingBottom: '1vh',
    // paddingLeft: 5,
    fontSize: 'x-small',
    width: '75vw',
    height: '10vh',
    // borderRadius: '4px',
    // borderRight: 'thin',
    // borderWidth: 'thin',
    borderColor: '#fafafa',
    backgroundColor: '#fafafa',
  },
};

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleChange = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
    }
    if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleLogIn = () => {
    console.log({
      username,
      password,
    });
  };

  return (
    <div style={styles.container}>
      <img
        style={styles.header}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
        alt="logo"
      />
      <div
        style={{
          width: '75vw',
          height: 1,
          backgroundColor: 'rgb(225, 225, 225)',
          marginTop: '5vh',
        }}
      />
      <div style={styles.inputs}>
        <TextField id="username" variant="outlined" style={styles.input} placeholder="Username" onChange={handleChange} />
        <TextField id="password" variant="outlined" style={styles.input} placeholder="Password" onChange={handleChange} />
      </div>
      <div style={{
        color: 'rgb(130, 130, 130)',
        marginTop: '4vh',
      }}>
        Don&#39;t have an account yet? <a style={{color: '#0000EE'}} onClick={() => console.log('eeeyyy')}>Sign up</a>
      </div>
      <CustomButton title="Log In" onClick={handleLogIn} />
      <div style={styles.footer}
      >
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
};

export default Login;
