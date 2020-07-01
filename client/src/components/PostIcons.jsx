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
  useEffect(() => {
    if (likedPosts && likedPosts.length > 0) {
      console.log(postId, likedPosts.findIndex(({ postId: id }) => id === postId));
      const index = likedPosts.findIndex(({ postId: id }) => id === postId);
      console.log(index, 'index');
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


  return (
    <div style={styles.container}>
      <div>
        {alreadyLiked ? fullHeart : emptyHeart}
        <i className="fa fa-comment-o fa-lg" aria-hidden="true" style={styles.icon} />
        <i className="fa fa-paper-plane-o fa-lg" aria-hidden="true" style={styles.icon} />
      </div>
      <div>
        <i className="fa fa-bookmark-o fa-lg" aria-hidden="true" style={styles.icon} />
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
