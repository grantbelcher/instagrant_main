import axios from 'axios';

export const viewFeed = () => (dispatch) => {
  console.log('IN VIEW FEED ACTION');
  dispatch({
    type: 'VIEW_FEED',
  });
};

export const viewProfile = (profileId) => async (dispatch) => {
  try {
    console.log(profileId);
    const response = await axios.get(`/users/profile/${profileId}`);
    const { data } = response;
    let profileInfo = data[0];
    axios.get(`/followers/myFollowers/${profileId}`)
      .then((res) => {
        console.log(res.data);
        const dataCopy = {};
        profileInfo.following = res.data.following.map((item) => item.followingId);
        profileInfo.followers = res.data.myFollowers.map((item) => item.followerId);
        dispatch({
          type: 'VIEW_PROFILE',
          payload: profileInfo,
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
