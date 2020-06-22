const initialState = {
  isLoggedIn: false,
  token: null,
  loading: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        token: payload.token,
        user: payload.username,
        userId: payload.userId,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        token: payload.token,
        user: payload.username,
        userId: payload.userId,
      };
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'USER_LOADED':
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        user: payload,
      };
    case 'AUTH_ERROR':
    case 'LOG_OUT':
      return {
        isLoggedIn: false,
        token: null,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
