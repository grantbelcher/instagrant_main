import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import view from './view';

export default combineReducers({ auth, error, view });
