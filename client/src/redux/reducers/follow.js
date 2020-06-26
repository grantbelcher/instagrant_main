const initialState = {
  followers: [],
  following: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
