import React, { useState } from 'react';

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
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    height: '20%',
    alignItems: 'center',
    marginTop: '5vh',
  },
  input: {
    marginTop: '1vh',
    paddingTop: '1vh',
    paddingBottom: '1vh',
    paddingLeft: 5,
    fontSize: 'x-small',
    width: '75vw',
    borderRadius: '4px',
    borderWidth: 'thin',
  },
};

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <div style={styles.container}>
      <img
        style={styles.header}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
        alt="logo"
      />
      <div style={styles.inputs}>
        <input
          style={styles.input}
          placeholder="Username"
        />
        <input
         style={styles.input}
          placeholder="Password"
        />
      </div>
    </div>
  );
};

export default Login;
