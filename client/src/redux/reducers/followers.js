const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'FOLLOWING_USERS_LOADED':
      return payload;
    default:
      return state,
  }
}