export default function(state = null, action) {
  const { type, payload } = action;
  switch(type) {
    case('SELECT_PHOTO'):
      return payload;
    default:
      return state;
  }
}