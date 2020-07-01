/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import setAuthToken from '../../../../utils/setAuthToken';
import { addError } from './error';
import { loadFollowStats } from './follow';
import { addToFeed } from './feed';
import { loadLikes } from './likes';

// export const loadUser = () => async (dispatch) => {
//   // if (localStorage.token) {
//   //   setAuthToken(localStorage.token);
//   // }
//   try {
//     const res = await axios.get('/auth/profile');
//     dispatch({
//       type: 'USER_LOADED',
//       payload: res.data.user,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const signIn = (username, password) => async (dispatch) => {
  console.log(username, password, 'action');
  try {
    dispatch({
      type: 'LOADING',
    });
    // convert to promise
    console.log(username, password);
    const response = await axios.post('/auth/signin', { username, password });
    // localStorage.setItem('token', response.data.token);
    const { userId } = response.data;
    // dispatch followers action
    dispatch(loadFollowStats(userId));
    dispatch(loadLikes(userId));
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: response.data,
    });
    
    dispatch({
      type: 'VIEW_FEED',
    });
  } catch (err) {
    console.error(err, 'loooook here');
    addError('invalid credentials*');
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

export const register = (userInfo) => (dispatch) => {
  console.log(userInfo);
  dispatch({
    type: 'REGISTER_SUCCESS',
    payload: userInfo,
  });
  // load followers as well
};

export const registerError = () => (dispatch) => {
  addError('username already exists*');
  dispatch({
    type: 'AUTH_ERROR',
  });
};


export const signOut = () => async (dispatch) => {
  try {
    await localStorage.removeItem('token');
    dispatch({
      type: 'LOG_OUT',
    });
  } catch (err) {
    console.error(err.message);
  }
};

// export const loadFollowing = (userId) => async (dispatch) => {
//   try {
//     const response = await axios.get(`/users/followers/myFollowers/${userId}`)
//     const { followers } = response.data
//     dispatch({
//       type: 'FOLLOWING_USERS_LOADED',
//       payload: followers,
//     })
//   } catch((err) => {
//     console.log(err, 'ERROR IN LOAD FOLLOWING ACTIOn')
//   })
// }
