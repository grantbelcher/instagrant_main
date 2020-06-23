/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';
import { addError } from './error';

export const newPost = (picture, caption, location) => async (dispatch) => {
  const { user, userId } = store.getState().auth;
  const data = {
    username: user, authorId: userId, picture, caption, location,
  };
  try {
    const response = await axios.post('/posts/upload-image', data);
    // ADD NEW POST WITH RESPONSE
  } catch (error) {
    addError('Failed to post image');
  }
  // console.log(response.data, 'response from server')
};

export const newProfilePic = (picture, caption, location) => async (dispatch) => {
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
  } catch (error) {
    addError('Failed to post image');
  }
};
