import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import { loadUser } from '../redux/actions/auth';
import store from '../redux/index';
import Auth from '../views/Auth';
// import setAuthToken from '../../../utils/setAuthToken';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = ({ isLoggedIn }) => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Auth />}
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(App);
