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
import Search from '../views/Search';
import { loadFollowStats } from '../redux/actions/follow';
// import setAuthToken from '../../../utils/setAuthToken';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = ({ isLoggedIn, userId, screen, loadFollowData }) => {
  let currentView;

  useEffect(() => {
    console.log(isLoggedIn, userId, 'useEffect outside of if block');
    if (userId) {
      console.log(isLoggedIn, userId, 'useEffect inside of if block');
      loadFollowData(userId);
    }
  }, [isLoggedIn]);
  if (!screen) {
    return <Auth />;
  }
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
    currentView = <Profile />;
  } else if (screen === 'post') {
    currentView = <Post />;
  } else if (screen === 'search') {
    currentView = <Search />;
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
  const { isLoggedIn, userId } = state.auth;
  const { screen } = state.view;
  return {
    isLoggedIn,
    screen,
  };
};

const mapDispatchToProps = {
  loadFollowData: loadFollowStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
