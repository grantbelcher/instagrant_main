import React from 'react';
import moment from 'moment';



const styles = {
  container: {
    paddingLeft: '5vw',
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    marginTop: '1vh',
    color: '#4c80e8',
    marginBottom: '1vh',
  },
};

const PostText = ({ post }) => {
  const postCaption = (
    <div>
      <strong>{post.username}</strong> {` ${post.caption}`}
    </div>
  );
  const commentLink = (
    <a style={styles.link}>
      {`View all ${post.comments} comments`}
    </a>
  );
  const noCommentsLink = (
    <a style={styles.link}>
    {`Leave a comment`}
  </a>
  );
  const date = moment(post.date).fromNow();

  return (
    <div style={styles.container}>
      <div style={{ fontWeight: 600, marginBottom: '1vh' }}>{post.likes} likes</div>
      {post.caption ? postCaption : null}
      {post.comments > 0 ? commentLink : noCommentsLink}
      <div style={{ color: '#4f4f4f' }}>{date}</div>
    </div>
  );
}

export default PostText;
