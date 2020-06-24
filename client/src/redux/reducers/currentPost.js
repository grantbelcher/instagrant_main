const initialState = {
  postId: 3,
  authorId: 8,
  username: 'instagrant420',
  location: 'Dicovery Bay',
  caption: 'check out this sweet picture that I took. I really hope you guys like it!',
  picture: 'https://res.cloudinary.com/instagrant/image/upload/v1592934741/instagrant/b1v3t1vqgwlqmrn8r2ax.jpg',
  likes: 24,
  date: '2020-06-24 14:14:14',
  comments: 69,
};

function currentPost (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export default currentPost;
