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
        endOfFeed: false,
      };
    case 'UPDATE_PROFILE_FEED':
      console.log(payload);
      console.log(...state.profileInfo.userFeed);
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          userFeed: [
            ...state.profileInfo.userFeed,
            ...payload,
          ],
          index: state.profileInfo.userFeed.index + 5,
        },
      };
      // const index = state.feed.findIndex(({ postId }) => payload === postId);

      // const feedCopyStart = state.feed.slice(0, index);
      // const feedCopyEnd = state.feed.slice(index + 1, state.feed.length);

      // const postCopyString = JSON.stringify(state.feed[index]);
      // const postCopy = JSON.parse(postCopyString);
      // postCopy.likes += 1;
    case 'INCREMENT_LIKES_PROFILE':
      const indexInFeed = state.profileInfo.userFeed.findIndex(({ postId }) => payload === postId)
      const feedCopyStart = state.profileInfo.userFeed.slice(0, indexInFeed);
      const feedCopyEnd = state.profileInfo.userFeed.slice(indexInFeed + 1, state.profileInfo.userFeed.length);

      const postCopyString = JSON.stringify(state.profileInfo.userFeed[indexInFeed]);
      const postCopy = JSON.parse(postCopyString);
      postCopy.likes += 1;
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          userFeed: [
            ...feedCopyStart,
            postCopy,
            ...feedCopyEnd,
          ]
        }
      }
    case 'DECREMENT_LIKES_PROFILE':
      const feedIndex = state.profileInfo.userFeed.findIndex(({ postId }) => payload === postId);
      const feedStart = state.profileInfo.userFeed.slice(0, feedIndex);
      const feedEnd = state.profileInfo.userFeed.slice(feedIndex + 1, state.profileInfo.userFeed.length);

      const postString = JSON.stringify(state.profileInfo.userFeed[feedIndex]);
      const copy = JSON.parse(postString);
      copy.likes -= 1;
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          userFeed: [
            ...feedStart,
            copy,
            ...feedEnd,
          ],
        },
      };
    case 'END_OF_PROFILE_FEED':
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          endOfFeed: true,
        },
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
    case 'UPDATE_PROFILE':
      const { fullname, title, bio } = payload;
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          fullname,
          title,
          bio,
        },
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
    case 'NEW_PROFILE_PIC':
      return {
        ...state,
        screen: 'new profile pic',
      };
    case 'UPDATE_AVATAR_PROFILE_INFO':
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          photo: payload,
        },
        screen: 'profile',
      };
    case 'NEW_AVATAR':
      return {
        ...state,
        screen: 'new avatar',
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
    case 'BACK_TO_AUTH':
      return {
        ...state,
        screen: null,
      };
    default:
      return state;
  }
}
