/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';
import { addError } from './error';
import { viewFeed } from './view';

export const newPost = (picture, caption, location) => async (dispatch) => {
  // 'LOOK HERE FOR BUG' avatar from state may not exist
  console.log(' ADDING NEW POST IN ACTION!!!!!!!!!!!');
  const { user, userId, avatar } = store.getState().auth;
  const data = {
    username: user, authorId: userId, profilePic: avatar, picture, caption, location,
  };
  try {
    console.log(data, 'try catch OF NEWPOST action');
    axios.post('/posts/upload-image', data);

    // ADD NEW POST WITH RESPONSE
  } catch (error) {
    addError('Failed to post image');
    console.log(error, 'ERROR OSTING NEWPOST ACTION')
  }
  // console.log(response.data, 'response from server')
};

export const newProfilePic = (picture, caption = null, location = null) => async (dispatch) => {
  const { user, userId } = store.getState().auth;
  const data = {
    username: user, authorId: userId, picture, caption, location,
  };
  try {
    const response = await axios.post('/posts/new_avatar', data);
    dispatch({
      type: 'CHANGE_AVATAR',
      payload: response.data.avatar,
    });
    dispatch({
      type: 'LOG_IN',
    });
    dispatch({
      type: 'VIEW_FEED',
    });
  } catch (error) {
    addError('Failed to post image');
  }
};

export const updateProfilePic = (picture, caption = null, location = null) => (dispatch) => {
  const { user: username, userId } = store.getState().auth;
  const data = {
    username, authorId: userId, picture, caption, location,
  };
  axios.post('/posts/updateAvatar', data)
    .then((response) => {
      console.log(response.data, 'RESPONSE AFTER UPDATING AVATAR');
    })
    .then(() => {
      dispatch({
        type: 'UPDATE_AVATAR_AUTH',
        payload: picture,
      });
    })
    .then(() => {
      dispatch({
        type: 'UPDATE_AVATAR_PROFILE_INFO',
        payload: picture,
      });
    });
};
