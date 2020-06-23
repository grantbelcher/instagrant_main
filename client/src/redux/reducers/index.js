import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import view from './view';
import upload from './upload';

export default combineReducers({
  auth, error, view, upload,
});
