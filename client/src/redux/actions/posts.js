/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';
import { addError } from './error';
import { viewFeed } from './view';

export const newPost = (picture, caption, location) => async (dispatch) => {
  console.log('fuuck!!!!')
  const { user, userId } = store.getState().auth;
  const data = {
    username: user, authorId: userId, picture, caption, location,
  };
  try {
    console.log('try catch')
    axios.post('/posts/upload-image', data)
      .then(() => {
        console.log('THENNNNNN')
        dispatch(viewFeed());
      });
    console.log('after dispatch')
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
    dispatch({
      type: 'VIEW_FEED',
    });
  } catch (error) {
    addError('Failed to post image');
  }
};
