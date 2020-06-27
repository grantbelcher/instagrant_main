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
    default:
      return state;
  }
}
