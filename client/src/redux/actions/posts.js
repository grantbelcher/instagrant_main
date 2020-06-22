/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';

export const newProfilePic = (picture, caption, location) => async (dispatch) => {
  const { user, userId } = store.getState().auth;
  const data = {
    username: user, userId, picture, caption, location,
  };
  console.log(data, 'all data before posting in action');
  // const response = axios.post('/addPost', {  })
};
