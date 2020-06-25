import axios from 'axios';

export const viewFeed = () => (dispatch) => {
  console.log('IN VIEW FEED ACTION')
  dispatch({
    type: 'VIEW_FEED',
  })
}

export const viewProfile = (profileId) => async (dispatch) => {
  try {
    console.log(profileId);
    const response = await axios.get(`/users/profile/${profileId}`);
    const { data } = response;
    console.log(response, 'response from action!!!!!!!')
    dispatch({
      type: 'VIEW_PROFILE',
      payload: data[0],
    })
  } catch (error) {
    // dispatch something else
    console.log(error);
  }
}