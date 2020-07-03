const initialState = {
  likedPosts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_LIKES':
      return {
        likedPosts: payload,
      };
    case 'ADD_TO_LIKES':
      console.log('MADE IT TO REDUCER!!!!!!!!!!')
      return {
        likedPosts: [...state.likedPosts, payload],
      };
    case 'UNLIKE_POST':
      const index = state.likedPosts.findIndex(({ postId }) => postId === payload.postId);;
      const copyStart = state.likedPosts.slice(0, index);
      const copyEnd = state.likedPosts.slice(index + 1, state.length);
      return {
        likedPosts: [...copyStart, ...copyEnd],
      };
    case 'LOG_OUT_LIKES':
      return initialState;
    default:
      return state;
  }
}
