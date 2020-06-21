import React, { useState } from 'react';
import LogIn from './LogIn';
import Register from './Register';
import AddProfilePic from './AddProfilePic';
import EditPost from '../components/EditPost';

const styles = {
  container: {
    width: '100%',
    height: '100vh',
  },
};

const Auth = () => {
  const [view, setView] = useState('Edit Pic');
  const [file, setFile] = useState(undefined);
  if (view === 'Log In') {
    return <LogIn changeView={setView} />;
  }
  if (view === 'Sign Up') {
    return <Register changeView={setView} />;
  }
  if (view === 'Profile Pic') {
    return <AddProfilePic changeView={setView} addFile={setFile} />;
  }
  if (view === 'Edit Pic') {
    return <EditPost />;
  }
};

export default Auth;
