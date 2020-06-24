import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import view from './view';
import upload from './upload';
import currentPost from './currentPost';
import feed from './feed';

export default combineReducers({
  auth, error, view, upload, currentPost, feed,
});
