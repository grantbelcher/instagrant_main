import React from 'react';
import LogIn from '../components/LogIn';


const styles = {
  container: {
    width: '100%',
    height: '100vh',
  },
};

const Auth = () => {
  return (
    <div style={styles.container}>
      <LogIn />
    </div>
  );
};

export default Auth;
