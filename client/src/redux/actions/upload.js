/* eslint-disable import/prefer-default-export */
import store from '../index';

export const selectPhoto = (image) => (dispatch) => {

  dispatch({
    type: 'SELECT_PHOTO',
    payload: image,
  });
  store.dispatch({ type: 'ADD_CAPTION' });
};
export const addNewAvatar = (image) => (dispatch) => {
  console.log('INSIDE ACTION!!!!!!!!!!!!!!!!!');
  dispatch({
    type: 'SELECT_PHOTO',
    payload: image,
  });
  dispatch({ type: 'NEW_AVATAR' });
};
