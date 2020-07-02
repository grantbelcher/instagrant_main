/* eslint-disable no-case-declarations */
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
      const firstPosts = state.feed.slice(0, 4);
      console.log([payload, ...firstPosts], 'IN REDUCER UPDATE FEED');
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
    case 'INCREMENT_LIKES':
      const index = state.feed.findIndex(({ postId }) => payload === postId);

      const feedCopyStart = state.feed.slice(0, index);
      const feedCopyEnd = state.feed.slice(index + 1, state.feed.length);

      const postCopyString = JSON.stringify(state.feed[index]);
      const postCopy = JSON.parse(postCopyString);
      postCopy.likes += 1;

      return {
        ...state,
        feed: [
          ...feedCopyStart,
          postCopy,
          ...feedCopyEnd,
        ],
      };
    case 'DECREMENT_LIKES':
      const postIndex = state.feed.findIndex(({ postId }) => payload === postId);

      const copyStart = state.feed.slice(0, postIndex);
      const copyEnd = state.feed.slice(postIndex + 1, state.feed.length);

      const copyString = JSON.stringify(state.feed[postIndex]);
      const copy = JSON.parse(copyString);
      copy.likes -= 1;
      return {
        ...state,
        feed: [
          ...copyStart,
          copy,
          ...copyEnd,
        ],
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
      const feedCopy = state.feed.slice(0, state.feed.length - 1);
      return {
        ...state,
        feed: [payload, ...feedCopy],
        newPosts: true,
      };
    case 'LOG_OUT_FEED':
      return initialState;
    case 'REMOVE_FEED_ALERT':
      return {
        ...state,
        newPosts: false,
      };
    default:
      return state;
  }
}
