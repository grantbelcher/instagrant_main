/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import setAuthToken from '../../../../utils/setAuthToken';
import { addError } from './error';

// export const loadUser = () => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
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
    const response = await axios.post(`http://localhost:1000/auth/signin`, { username, password });
    // localStorage.setItem('token', response.data.token);
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: response.data,
    });
  } catch (err) {
    console.error(err, 'loooook here');
    addError('invalid credentials');
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
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
