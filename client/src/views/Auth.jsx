import React, { useState, useEffect } from 'react';
import LogIn from './LogIn';
import Register from './Register';
import AddProfilePic from './AddProfilePic';
import EditPost from '../components/EditPost';
import AddCaption from './AddCaption';

const styles = {
  container: {
    width: '100%',
    height: '100vh',
  },
};

const Auth = () => {
  const [view, setView] = useState('Add Caption');
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    if (file) {
      setView('Add Caption');
    }
  }, [file]);

  const goToAddCaption = () => {
    setView('Add Caption');
  };

  if (view === 'Log In') {
    return <LogIn changeView={setView} />;
  }
  if (view === 'Sign Up') {
    return <Register changeView={setView} />;
  }
  if (view === 'Profile Pic') {
    return <AddProfilePic changeView={setView} />;
  }
  if (view === 'Edit Pic') {
    return <EditPost addFile={setFile} changeView={setView} inRegistration={true} />;
  }
  if (view === 'Add Caption') {
    return <AddCaption file={file} changeView={setView} inRegistration={true} />;
  }
};

export default Auth;
