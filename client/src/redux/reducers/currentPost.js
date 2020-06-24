const initialState = {
  postId: 3,
  authorId: 8,
  username: 'instagrant420',
  location: 'Legal Test Kitchen-Bostan-Logan Airport Terminal',
  caption: 'check out this sweet picture that I took. I really hope you guys like it!',
  picture: 'https://res.cloudinary.com/instagrant/image/upload/v1592934741/instagrant/b1v3t1vqgwlqmrn8r2ax.jpg',
};

function currentPost (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export default currentPost;
