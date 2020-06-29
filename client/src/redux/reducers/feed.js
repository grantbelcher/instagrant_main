const initialState = {
  index: 1,
  feed: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_TO_FEED':
      return {
        ...state,
        feed: [...state.feed, ...payload],
        index: state.index + 5,
      };
    default:
      return state;
  }
}
