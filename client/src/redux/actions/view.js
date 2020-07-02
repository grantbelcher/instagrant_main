import axios from 'axios';
import store from '../index';

export const viewFeed = () => (dispatch) => {
  console.log('IN VIEW FEED ACTION');
  dispatch({
    type: 'VIEW_FEED',
  });
};

export const viewProfile = (profileId) => async (dispatch) => {
  try {
    const response = await axios.get(`/users/profile/${profileId}`);
    const { data } = response;
    const profileInfo = data[0];
    axios.get(`/followers/myFollowers/${profileId}`)
      .then((res) => {
        console.log(res.data);
        const dataCopy = {};
        profileInfo.following = res.data.following.map((item) => item.followingId);
        profileInfo.followers = res.data.myFollowers.map((item) => item.followerId);
        profileInfo.posts = res.data.posts;
      })
      .then(() => {
        axios.post('/posts/userFeed', { authorId: profileId, index: 0 })
          .then((info) => {
            profileInfo.userFeed = info.data;
            profileInfo.index = 5;
            dispatch({
              type: 'VIEW_PROFILE',
              payload: profileInfo,
            });
          })
          .catch((err) => {
            console.log(err, 'ERROR LOADING USERS FEED');
          });
      })
      .catch((err) => {
        console.log(err, 'ERROR');
      });
  } catch (error) {
    // dispatch something else
    console.log(error);
  }
};

export const updateProfileFeed = () => async (dispatch) => {
  try {
    const { index, userId } = store.getState().view.profileInfo;
    const newPosts = await axios.post('/posts/userFeed', { authorId: userId, index });
    dispatch({
      type: 'UPDATE_PROFILE_FEED',
      payload: newPosts.data,
    });
  } catch (error) {
    console.log(error, 'ERROR UPDATING POSTS');
  }
};

export const editProfile = () => (dispatch) => {
  dispatch({
    type: 'EDIT_PROFILE',
  });
};

export const updateFollowStats = (userId, alreadyFollowing) => (dispatch) => {
  if (alreadyFollowing) {
    dispatch({
      type: 'UNFOLLOW_VIEW',
      payload: userId,
    });
  } else {
    dispatch({
      type: 'FOLLOW_VIEW',
      payload: userId,
    });
  }
};

export const updateProfile = ({ name: fullname, myTitle: title, aboutMe: bio }) => (dispatch) => {
  dispatch({
    type: 'UPDATE_PROFILE',
    payload: {
      fullname,
      title,
      bio,
    },
  });

  const { userId } = store.getState().auth;
  console.log(userId);
  const data = {
    userId,
    fullname,
    bio,
    title,
  };
  axios.patch('/users/updateProfile', data)
    .then((response) => {
      console.log(response.data, 'RESPONSE FROM PATCH');
    })
    .then(() => {
      setTimeout(() => {
        dispatch({
          type: 'BACK_TO_PROFILE',
        });
      }, 600);
    })
    .catch((err) => {
      console.log(err);
    });
};
