/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';
import auth from '../reducers/auth';
import { addToFeed, initFeed } from './feed';

export const loadFollowStats = (userId) => async (dispatch) => {
  const dataCopy = {};
  axios.get(`/followers/myFollowers/${userId}`)
    .then((followers) => {
      console.log(followers.data);
      dataCopy.following = followers.data.following.map((item) => item.followingId);
      dataCopy.myFollowers = followers.data.myFollowers.map((item) => item.followerId);
    })
    .then(() => {
      dispatch({
        type: 'LOAD_FOLLOW_STATS',
        payload: dataCopy,
      });
    })
    .then(() => {
      console.log('YOOOOOO');
      // dispatch(addToFeed(userId, dataCopy.following));
      dispatch(initFeed(dataCopy.following));
    })
    .catch((err) => {
      console.log(err, 'ERROR');
    });
};

export const startFollowing = (followerId, followingId) => async (dispatch) => {
  console.log(followingId, 'look here');
  try {
    const response = await axios.post(`/followers/addFollower/${followerId}/${followingId}`);
    const { data } = response;
    console.log(data, 'response');
    dispatch({
      type: 'ADD_TO_FOLLOWING',
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unfollow = (followerId, followingId) => async (dispatch) => {
  try {
    const config = {
      data: {
        followerId,
        followingId,
      },
    };
    const response = await axios.delete('/followers/unfollow', config);
    console.log(response.data);
    dispatch({
      type: 'UNFOLLOW',
      payload: followingId,
    });
  } catch (error) {
    console.log(error, 'error in unfollow action');
  }
};
