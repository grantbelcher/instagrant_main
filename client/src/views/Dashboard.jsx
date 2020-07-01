import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import debounce from 'lodash.debounce';
import CircularProgress from '@material-ui/core/CircularProgress';
import store from '../redux/index';
import Footer from '../components/Footer';
import Post from '../components/Post';

import {
  addToFeed, loadNextPosts, beginScroll, setTopInView, initFeed,
} from '../redux/actions/feed';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100vw',
    // backgroundColor: 'red',
  },
  header: {
    backgroundColor: '#d6d6d6',
    top: 0,
    position: 'fixed',
    height: '8vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottom: 'solid',
    borderWidth: 'thin',
    borderColor: 'white',
  },
  footer: {
    bottom: '90vh',
    position: 'fixed',
    width: '100%',
  },
  logo: {
    height: '6vh',
    width: '35%',
  },
  alertButton: {
    position: 'fixed',
    zIndex: 100,
    top: '12vh',
    right: '2vw',
    backgroundColor: 'rgba(242, 101, 202, 0.95)',
  },
};

// bring feed into Dashboard from state

const Dashboard = ({
  screen, feed, topInView, getFeed, startScroll, viewTop, loadNext, loading, endOfFeed, following, resetFeed, newPosts,
}) => {
  useEffect(() => {
    // get initial feed
    console.log('ressetting');
    resetFeed();
  }, [following]);

  let posts;
  // if (!feed) {
  //   // return loading icon
  // }
  posts = feed.map((post, i) => {
    if (i === 0) {
      return (
        <Post
          post={post}
          first
        />
      );
    }
    return (
      <Post
        post={post}
      />
    );
  });

  let test = true;

  return (
    <div style={styles.container} id="feed">
      <div style={styles.header}>
        <i className="fa fa-camera fa-lg" aria-hidden="true" style={{ marginLeft: '4vw' }} onClick={() => store.dispatch({ type: 'ADD_POST' })} />
        <img
          style={styles.logo}
          src="https://res.cloudinary.com/instagrant/image/upload/v1593545227/Screen_Shot_2020-06-30_at_12.26.59_PM_jtacwi.png"
          alt="logo"
        />
        <i className="fa fa-paper-plane-o fa-lg" aria-hidden="true" style={{ marginRight: '4vw' }} />
      </div>
      {posts}
      {loading ? <CircularProgress /> : null}
      {endOfFeed ? <div>End Of Feed!</div> : null}
      <div style={{ height: '10vh', marginTop: '3vh' }} />
      <Footer />
      {newPosts ? (<Button style={styles.alertButton} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>Check New Posts!</Button>) : null}
    </div>
  );
};

const mapStateToProps = ({ view, feedInfo, followStats }) => {
  const { screen } = view;
  const {
    feed, topInView, loading, endOfFeed, newPosts,
  } = feedInfo;
  const { following } = followStats;
  return {
    screen,
    feed,
    topInView,
    loading,
    endOfFeed,
    following,
    newPosts,
  };
};

const mapDispatchToProps = {
  getFeed: addToFeed,
  startScroll: beginScroll,
  viewTop: setTopInView,
  loadNext: loadNextPosts,
  resetFeed: initFeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
