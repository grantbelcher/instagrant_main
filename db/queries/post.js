const createPostQuery = ({
  username, authorId, profilePic, picture, caption, location,
}) => {
  if (username && authorId && picture) {
    let values = `"${username}", "${authorId}", "${profilePic}", "${picture}"`;
    if (caption.length > 1) {
      values = `${values}, "${caption}"`;
    } else {
      values = `${values}, null`;
    }
    if (location) {
      values = `${values}, "${location}"`;
    } else {
      values = `${values}, null`;
    }
    return `INSERT INTO posts (username, authorId, profilePic, picture, caption, location) VALUES (${values});`;
  }
  return null;
};

const getFeedQuery = (userId) => {
  `SELECT * FROM posts `
}

module.exports.createPostQuery = createPostQuery;
