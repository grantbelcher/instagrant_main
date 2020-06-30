/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';

export const loadFeed = () => async (dispatch) => {
  // get myuser id and send it with request
  const { userId } = store.getState().auth;
  const results = await axios.get(`/posts/myFeed/${userId}`);
  console.log(results, 'results');
};

export const addToFeed = (user = null, followingArray = null) => async (dispatch) => {
  // get current userId and array of followers from store.getState().auth
  console.log('eyyyyy');
  const { auth, feedInfo, followStats } = store.getState;
  let userId;
  if (auth) {
    userId = auth.userId;
  }
  let index;
  if (feedInfo) {
    index = feedInfo.index;
  } else {
    index = 0;
  }
  let following;
  if (followStats) {
    following = followStats.following;
  }
  const data = {
    index,
  };
  if (!following || following.length === 0) {
    if (followingArray === null) {
      console.log('errrr');
    } else {
      data.following = followingArray;
    }
  } else {
    data.following = following;
  }
  if (!userId) {
    if (user === null) {
      console.log('errrrrr');
    } else {
      data.userId = user;
    }
  } else {
    data.userId = userId;
  }
  try {
    const response = await axios.post('/posts/myFeed', data);
    dispatch({
      type: 'ADD_TO_FEED',
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const beginScroll = (scrollY) => (dispatch) => {
  dispatch({
    type: 'BEGIN_SCROLL',
    payload: scrollY,
  });
};

export const setTopInView = () => (dispatch) => {
  dispatch({
    type: 'SET_TOP_IN_VIEW',
  });
};

export const loadNextPosts = () => async (dispatch) => {
  console.log('before request');
  const { auth, feedInfo, followStats, view } = store.getState();
  const { screen } = view;
  if (screen !== 'feed') {
    console.log('screen is not feed');
    return;
  }
  try {
    const { index } = feedInfo;
    const { userId } = auth;
    const { following } = followStats;

    const data = {
      index,
      userId,
      following,
    };

    const response = await axios.post('/posts/myFeed', data);
    console.log(response);
    dispatch({
      type: 'ADD_TO_FEED',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'ERROR_LOADING_FEED',
    });
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ERROR_FROM_FEED',
      });
    }, 4000);
  }
};
