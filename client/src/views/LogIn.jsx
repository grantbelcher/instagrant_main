import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CustomButton from '../components/CustomButton';
import { signIn } from '../redux/actions/auth';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    height: '30%',
    width: '60%',
    paddingTop: '20%',
  },
  error: {
    color: 'red',
    marginTop: '5vh',
    width: '75%',
  },
  noError: {
    color: 'transparent',
    marginTop: '5vh',
    width: '75%',
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
    marginTop: '-1vh',
    fontSize: 'small',
    width: '75vw',
    height: '7vh',
    borderColor: '#fafafa',
    backgroundColor: '#fafafa',
  },
  input2: {
    marginTop: '8vh',
    fontSize: 'small',
    width: '75vw',
    height: '7vh',
    borderColor: '#fafafa',
    backgroundColor: '#fafafa',
  },
};

const Login = ({ logIn, error, changeView }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [visibility, setVisibility] = useState(false);

  const handleChange = (e) => {
    if (e.target.id === 'username') {
      setUsername(e.target.value);
    }
    if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
    if (username.length > 3 && password.length > 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleLogIn = () => {
    logIn(username, password);
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
          fontSize: 'smaller',
        }}
      />
      <div style={error ? styles.error : styles.noError}>
        {error || 'no error'}
      </div>
      <div style={styles.inputs}>
        <Input id="username" variant="outlined" style={styles.input} placeholder="Username" onChange={handleChange} />
        <Input
          id="password"
          variant="outlined"
          style={styles.input2}
          placeholder="Password"
          onChange={handleChange}
          type={visibility ? 'text' : 'password'}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                onClick={visibility ? () => setVisibility(false) : () => setVisibility(true)}
              >
                {visibility ? <i className="fa fa-eye-slash" /> : <i className="fa fa-eye" />}
              </IconButton>
            </InputAdornment>
          )}
        />
      </div>
      <div style={{
        color: 'rgb(130, 130, 130)',
        marginTop: '4vh',
      }}
      >
        Don&#39;t have an account yet?
        {' '}
        <a style={{ color: '#4fa9f6' }} onClick={() => changeView('Sign Up')}>Sign up</a>
      </div>
      <CustomButton title="Log In" onClick={handleLogIn} disabled={disabled} />
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
};

const mapStateToProps = ({ error }) => ({
  error,
});

const mapDispatchToProps = {
  logIn: signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
