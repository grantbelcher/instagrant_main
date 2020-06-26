const initialState = {
  screen: null,
  viewInfo: null,
  profileInfo: null,
};


export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'VIEW_PROFILE':
      console.log(payload, 'reducer');
      return {
        ...state,
        profileInfo: payload,
        screen: 'profile',
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
    // case 'VIEW_MY_PROFILE':
    //   return {
    //     ...state,

    //     screen: 'my profile',
    //   };
    case 'SEARCH_PROFILES':
      return {
        ...state,
        profileInfo: null,
        screen: 'search',
      };
    default:
      return state;
  }
}
