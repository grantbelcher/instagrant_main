import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import { loadUser } from '../redux/actions/auth';
import store from '../redux/index';
import Auth from '../views/Auth';
import Profile from '../views/Profile';
import Post from './Post';
import EditPost from './EditPost';
import AddCaption from '../views/AddCaption';
// import setAuthToken from '../../../utils/setAuthToken';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = ({ isLoggedIn, screen }) => {
  let currentView;
  if (screen === 'feed') {
    currentView = <Dashboard />;
  } else if (screen === 'profile') {
    currentView = <Profile />;
  } else if (screen === 'new post') {
    currentView = <EditPost />;
  } else if (screen === 'add profile pic') {
    currentView = <EditPost />;
  } else if (screen === 'add caption') {
    currentView = <AddCaption inRegistration={false} />;
  } else if (screen === 'my profile') {
    currentView = <div>My profile!</div>;
  } else if (screen === 'post') {
    currentView = <Post />;
  }
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Auth />}
        </Route>
        <Route path="/dashboard">
          {currentView}
        </Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  const { screen } = state.view;
  return {
    isLoggedIn,
    screen,
  };
};

export default connect(mapStateToProps, null)(App);
