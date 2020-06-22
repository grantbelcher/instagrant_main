/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@babel/polyfill';
import App from './components/App';
import store from './redux/index';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme/muiTheme';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app'),
);
