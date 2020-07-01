const initialState = {
  index: 0,
  feed: [],
  loading: false,
  scroll: 0,
  topInView: true,
  endOfFeed: false,
  error: null,
  newPosts: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_INITIAL_POSTS':
      return {
        ...state,
        feed: [],
      };
    case 'INITIAL_FEED':
      return {
        ...state,
        index: 5,
        feed: [...payload],
      };
    case 'ADD_TO_FEED':
      return {
        ...state,
        feed: [...state.feed, ...payload],
        index: state.index + 5,
        loading: false,
      };
    case 'UPDATE_FEED':
      const firstPosts = state.feed.slice(0, 4)
      console.log([payload, ...firstPosts], 'IN REDUCER UPDATE FEED')
      return {
        ...state,
        feed: [payload, ...firstPosts],
      };
    case 'BEGIN_SCROLL':
      return {
        ...state,
        topInView: false,
        scroll: payload,
      };
    case 'SET_TOP_IN_VIEW':
      return {
        ...state,
        topInView: true,
      };
    case 'LOAD_NEXT_POSTS':
      return {
        ...state,
        loading: true,
      };
    case 'END_OF_FEED':
      return {
        ...state,
        endOfFeed: true,
        loading: false,
      };
    case 'ERROR_LOADING_FEED':
      return {
        ...state,
        error: 'error loading posts',
      };
    case 'REMOVE_ERROR_FROM_FEED':
      return {
        ...state,
        error: null,
      };
    case 'NEW_POSTS_IN_FEED':
      const feedCopy = state.feed.slice(0, state.feed.length - 1)
      return {
        ...state,
        feed: [payload, ...feedCopy],
        newPosts: true,
      };
    case 'REMOVE_FEED_ALERT':
      return {
        ...state,
        newPosts: false,
      };
    default:
      return state;
  }
}
