import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    height: '20%',
    width: '50%',
    paddingTop: '10%',
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
        />
    </div>
  );
};

export default Login;
