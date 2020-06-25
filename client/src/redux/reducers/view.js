const initialState = {
  screen: 'feed',
  viewInfo: null,
};


export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'VIEW_PROFILE':
      return {
        ...state,
        screen: 'profile',
      };
    case 'ADD_POST':
      return {
        ...state,
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
        screen: 'add caption',
      };
    case 'VIEW_FEED':
      return {
        ...state,
        screen: 'feed',
      };
    case 'VIEW_MY_PROFILE':
      return {
        ...state,
        screen: 'my profile',
      };
    case 'SEARCH_PROFILES':
      return {
        ...state,
        screen: 'search',
      };
    case 'REMOVE_ERROR':
      return null;
    default:
      return state;
  }
}
