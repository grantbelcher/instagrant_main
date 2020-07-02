/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';

export const loadLikes = (userId) => async (dispatch) => {
  axios.get(`/likes/myLikes/${userId}`)
    .then((response) => {
      console.log(response.data, 'RESPONSE LOAD LIKES');
      // const likes = response.data.map((row) => row.postId);
      dispatch({
        type: 'LOAD_LIKES',
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err, 'ERROR');
    });
};

export const likePost = (postId) => async (dispatch) => {
  console.log(postId, 'LIKE POST ACTION, ');
  const { userId } = store.getState().auth;
  const { screen } = store.getState().view;
  console.log(userId, 'from getState');
  try {
    const response = await axios.post(`/likes/likePost/${postId}/${userId}`);
    dispatch({
      type: 'ADD_TO_LIKES',
      payload: { postId },
    });
    dispatch({
      type: 'INCREMENT_LIKES',
      payload: postId,
    });
    if (screen === 'profile') {
      dispatch({
        type: 'INCREMENT_LIKES_PROFILE',
        payload: postId,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  const { userId } = store.getState().auth;
  try {
    const config = {
      data: {
        postId,
        userId,
      },
    };
    const response = await axios.delete('/likes/unlike', config);
    console.log(response.data);
    dispatch({
      type: 'UNLIKE_POST',
      payload: { postId },
    });
    dispatch({
      type: 'DECREMENT_LIKES',
      payload: postId,
    });
    dispatch({
      type: 'DECREMENT_LIKES_PROFILE',
      payload: postId,
    });
  } catch (error) {
    console.log(error, 'error in unfollow action');
  }
};
