import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import CustomButton from '../components/CustomButton';
import { register } from '../redux/actions/auth';

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
    marginTop: '5vh',
    fontSize: 'smaller',
    width: '75vw',
    height: '6vh',
    borderColor: '#fafafa',
    backgroundColor: '#fafafa',
  },
};

const Register = ({ changeView, registerUser }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [social, setSocial] = useState('');
  const [visibility, setVisibility] = useState(false);

  const disabled = (fullName.length < 2 || username.length < 6 || password.length < 6);

  const handleSocial = (e) => {
    if (social.length === 2 || social.length === 7) {
      setSocial(`${e.target.value} - `);
    } else if (social.length === 15) {

    } else {
      setSocial(e.target.value);
    }
  };

  const handleSubmit = () => {
    console.log(disabled);
    registerUser(username, fullName, password);
  };

  return (
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
        <Input id="fullName" variant="outlined" style={styles.input} placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} value={fullName} />
        <Input id="username" variant="outlined" style={styles.input} placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
        <Input id="ssn" variant="outlined" style={styles.input} placeholder="Social Security #" onChange={(e) => handleSocial(e)} value={social} />
        <Input
          id="password"
          variant="outlined"
          style={styles.input}
          placeholder="Password"
          type={visibility ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
      <CustomButton title="Next" onClick={handleSubmit} disabled={disabled} />
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

const mapDispatchToProps = {
  registerUser: register,
};

export default connect(null, mapDispatchToProps)(Register);
