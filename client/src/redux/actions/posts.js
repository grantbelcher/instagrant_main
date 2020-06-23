/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';

export const newProfilePic = (picture, caption, location) => async (dispatch) => {
  const { user, userId } = store.getState().auth;
  const data = {
    username: user, authorId: userId, picture, caption, location,
  };
  console.log(data, 'all data before posting in action');
  const response = await axios.post('/posts/upload-image', data);
  console.log(response.data, 'response from server')
};
