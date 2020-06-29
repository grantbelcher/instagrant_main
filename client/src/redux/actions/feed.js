/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';

export const loadFeed = () => async (dispatch) => {
  // get myuser id and send it with request
  const { userId } = store.getState().auth;
  const results = await axios.get(`/posts/myFeed/${userId}`);
  console.log(results, 'results');
};

export const addToFeed = () => async (dispatch) => {
  // get current userId and array of followers from store.getState().auth
  const { auth, feed, followStats} = store.getState;
  const { userId } = auth;
  const { index } = feed;
  const { following } = followStats;
  const data = {
    userId,
    following,
    index,
  };
  try {
    // axios post request to posts/myFeed
    const response = await axios.post('/posts/myFeed');
    console.log(response.data, action)
  } catch (error) {
    console.log(error);
  }
};
