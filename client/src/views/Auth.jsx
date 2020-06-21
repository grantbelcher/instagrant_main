import React, { useState } from 'react';
import LogIn from '../components/LogIn';


const styles = {
  container: {
    width: '100%',
    height: '100vh',
  },
};

const Auth = () => {
  const [view, setView] = useState('Log In');
  if (view === 'Log In') {
    return <LogIn changeView={setView} />;
  }
  if (view === 'Sign Up') {
    return <div>sign up</div>;
  }
};

export default Auth;
