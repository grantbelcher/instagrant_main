const initialState = {
  view: null,
  viewInfo: null,
}


export default function (state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case 'VIEW_PROFILE':
      console.log('viewing profile');
      return state;
    case 'VIEW_FEED':
      console.log('viewing feed');
      return state
    case 'SEARCH USERS':
      console.log('searching users')
      return state
    case 'REMOVE_ERROR':
      return null;
    default:
      return state;
  }
}
