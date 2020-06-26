/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';
import auth from '../reducers/auth';

export const loadFollowStats = (userId) => async (dispatch) => {
  axios.get(`/followers/myFollowers/${userId}`)
    .then((followers) => {
      console.log(followers.data, 'response in action');
    })
    .catch((err) => {
      console.log(err, 'ERROR');
    });
};
