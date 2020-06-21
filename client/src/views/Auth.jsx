import React, { useState } from 'react';
import LogIn from './LogIn';
import Register from './Register';
import AddProfilePic from './AddProfilePic';

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
  if (view === 'Profile Pic') {
    return <AddProfilePic />;
  }
};

export default Auth;
