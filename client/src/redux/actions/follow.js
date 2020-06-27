/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';
import auth from '../reducers/auth';

export const loadFollowStats = (userId) => async (dispatch) => {
  axios.get(`/followers/myFollowers/${userId}`)
    .then((followers) => {
      dispatch({
        type: 'LOAD_FOLLOW_STATS',
        payload: followers.data,
      });
    })
    .catch((err) => {
      console.log(err, 'ERROR');
    });
};

export const startFollowing = (followerId, followingId) => async (dispatch) => {
  console.log(followerId, followingId);
  try {
    const response = await axios.post(`followers/addFollower/${followerId}/${followingId}`);
    const { data } = response;
    dispatch({
      type: 'ADD_TO_FOLLOWING',
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
