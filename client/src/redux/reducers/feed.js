const initialState = {
  index: 0,
  myFeed: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_TO_FEED':
      return {
        ...state,
        feed: [...state.feed, ...payload],
      };
    default:
      return state;
  }
}
