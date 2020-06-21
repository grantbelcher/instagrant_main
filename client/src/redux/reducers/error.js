
export default function (state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_ERROR':
      return payload;
    case 'REMOVE_ERROR':
      return null;
    default:
      return state;
  }
}
