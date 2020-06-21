/* eslint-disable import/prefer-default-export */
import store from '../index';

export const addError = (message) => {
  store.dispatch({
    type: 'ADD_ERROR',
    payload: message,
  });
  setTimeout(() => {
    store.dispatch({
      type: 'REMOVE_ERROR',
    });
  }, 5000);
};
