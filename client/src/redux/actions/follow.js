/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import store from '../index';
import auth from '../reducers/auth';

export const loadFollowStats = (userId) => async (dispatch) => {
  const x = store.getState(auth);
  console.log(x, userId, 'action');
};