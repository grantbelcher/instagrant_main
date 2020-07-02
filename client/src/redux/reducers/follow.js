/* eslint-disable no-case-declarations */
const initialState = {
  myFollowers: [],
  following: [],
};



export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_FOLLOW_STATS':
      return payload;
    case 'ADD_TO_FOLLOWING':
      const { followingId } = payload;
      return {
        ...state,
        following: [...state.following, followingId],
      };
    case 'UNFOLLOW':
      const { following } = state;
      const index = following.indexOf(payload);
      const copyStart = following.slice(0, index);
      const copyEnd = following.slice(index + 1, following.length);
      return {
        ...state,
        following: [...copyStart, ...copyEnd],
      };
    case 'LOG_OUT_FOLLOW':
      return initialState;
    default:
      return state;
  }
}
