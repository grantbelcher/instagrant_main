import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import view from './view';
import upload from './upload';
import currentPost from './currentPost';
import feedInfo from './feed';
import followStats from './follow';

export default combineReducers({
  auth, error, view, upload, currentPost, feedInfo, followStats,
});
