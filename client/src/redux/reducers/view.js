/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
const initialState = {
  screen: null,
  viewInfo: null,
  profileInfo: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'VIEW_PROFILE':
      return {
        ...state,
        profileInfo: payload,
        screen: 'profile',
      };
    case 'BACK_TO_PROFILE':
      return {
        ...state,
        screen: 'profile',
      };
    case 'EDIT_PROFILE':
      return {
        ...state,
        screen: 'edit profile',
      };
    case 'ADD_POST':
      return {
        ...state,
        profileInfo: null,
        screen: 'new post',
      };
    case 'ADD_PROFILE_PIC':
      return {
        ...state,
        screen: 'add profile pic',
      };
    case 'ADD_CAPTION':
      return {
        ...state,
        profileInfo: null,
        screen: 'add caption',
      };
    case 'VIEW_FEED':
      return {
        ...state,
        profileInfo: null,
        screen: 'feed',
      };
    case 'SEARCH_PROFILES':
      return {
        ...state,
        profileInfo: null,
        screen: 'search',
      };
    case 'UNFOLLOW_VIEW':
      const { profileInfo: profile } = state;
      const { followers: followersCopy } = profile;
      const index = followersCopy.indexOf(payload);
      const copyStart = followersCopy.slice(0, index);
      const copyEnd = followersCopy.slice(index + 1, followersCopy.length);
      return {
        ...state,
        profileInfo: {
          ...profile,
          followers: [...copyStart, ...copyEnd],
        },
      };
    case 'FOLLOW_VIEW':
      const { profileInfo } = state;
      const { followers } = profileInfo;
      return {
        ...state,
        profileInfo: {
          ...profileInfo,
          followers: [...followers, payload],
        },
      };
    case 'LOG_IN':
      return {
        ...state,
        screen: 'feed',
      };
    default:
      return state;
  }
}
