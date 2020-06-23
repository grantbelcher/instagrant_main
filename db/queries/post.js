const createPostQuery = ({
  username, authorId, picture, caption, location,
}) => {
  if (username && authorId && picture) {
    let values = `"${username}", "${authorId}", "${picture}"`;
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
    return `INSERT INTO posts (username, authorId, picture, caption, location) VALUES (${values});`;
  }
  return null;
};

module.exports.createPostQuery = createPostQuery;
