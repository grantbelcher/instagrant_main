import React, { useState } from 'react';
import LogIn from './LogIn';
import Register from './Register';

const styles = {
  container: {
    width: '100%',
    height: '100vh',
  },
};

const Auth = () => {
  const [view, setView] = useState('Sign Up');
  if (view === 'Log In') {
    return <LogIn changeView={setView} />;
  }
  if (view === 'Sign Up') {
    return <Register changeView={setView} />;
  }
};

export default Auth;
