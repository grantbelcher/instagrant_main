
const initialState = {
  isLoggedIn: false,
  token: null,
  loading: false,
  user: null,
  avatar: null,
};
// const initialState = {
//   isLoggedIn: true,
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcxLCJpYXQiOjE1OTM0NzgyODUsImV4cCI6MTU5MzQ4MTg4NX0.qeCqSnmytb7NjIKEUBL0IInrUoA32fK3XrGDxchitAc',
//   loading: true,
//   user: '@ganjagreezy',
//   avatar: 'https://res.cloudinary.com/instagrant/image/upload/v1593405608/instagrant/stho0z1nz5pae4l8ll5a.png',
//   userId: 71
// }

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
        avatar: payload.avatar,
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
    case 'CHANGE_AVATAR':
      console.log('made it to the reducer');
      return {
        ...state,
        avatar: payload,
      };
    default:
      return state;
  }
}
