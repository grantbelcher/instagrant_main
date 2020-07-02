import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/likes';

const styles = {
  container: {
    height: '5vh',
    display: 'flex',
    flexDirection: 'row',
    padding: '3vw',
    justifyContent: 'space-between',
    fontSize: 'larger',
  },
  icon: {
    margin: '2vw',
  },
  fullIcon: {
    color: 'black',
    margin: '2vw',
  },
  emptyHeart: {
    margin: '2vw',
  },
  fullHeart: {
    margin: '2vw',
    color: '#ec4184',
  },
};

const PostIcons = ({
  postId, likedPosts, likeThisPost, unlikeThisPost,
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (likedPosts && likedPosts.length > 0) {
      const index = likedPosts.findIndex(({ postId: id }) => id === postId);
      if (index > -1) {
        setAlreadyLiked(true);
      } else {
        setAlreadyLiked(false);
      }
    }
  }, [likedPosts]);


  const emptyHeart = (
    <i
      className="fa fa-heart-o fa-lg"
      aria-hidden="true"
      style={styles.emptyHeart}
      onClick={() => likeThisPost(postId)}
    />
  );

  const fullHeart = (
    <i
      className="fa fa-heart fa-lg"
      aria-hidden="true"
      style={styles.fullHeart}
      onClick={() => unlikeThisPost(postId)}
    />
  );

  const emptyIcon = (
    <i
      className="fa fa-bookmark-o fa-lg"
      aria-hidden="true"
      style={styles.icon}
      onClick={() => setSaved(true)}
    />
  );

  const fullIcon = (
    <i
      className="fa fa-bookmark fa-lg"
      aria-hidden="true"
      style={styles.fullIcon}
      onClick={() => setSaved(false)}
    />
  );


  return (
    <div style={styles.container}>
      <div>
        {alreadyLiked ? fullHeart : emptyHeart}
        <i className="fa fa-comment-o fa-lg" aria-hidden="true" style={styles.icon} />
        <i className="fa fa-paper-plane-o fa-lg" aria-hidden="true" style={styles.icon} />
      </div>
      <div>
        {saved ? fullIcon : emptyIcon}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  likeThisPost: likePost,
  unlikeThisPost: unlikePost,
};

const mapStateToProps = ({ likes }) => {
  const { likedPosts } = likes;
  return {
    likedPosts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostIcons);
