import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import CircularProgress from '@material-ui/core/CircularProgress';
import store from '../redux/index';
import Footer from '../components/Footer';
import Post from '../components/Post';
import { addToFeed, loadNextPosts, beginScroll, setTopInView } from '../redux/actions/feed';

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
    backgroundColor: 'white',
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
};

// bring feed into Dashboard from state

const Dashboard = ({
  screen, feed, topInView, getFeed, startScroll, viewTop, loadNext, loading
}) => {
  // const [loading, setLoading] = useState(false);
//   // const [scroll, setScroll] = useState(0);
//   const scrollEvent = debounce(() => {
//     // Bails early if:
//     // * there's an error
//     // * it's already loading
//     // * there's nothing left to load
//     if (screen === 'feed') {
//       if (topInView && window.innerHeight + document.documentElement.scrollTop > 1800) {
//         // set topInView to false
//         startScroll(document.documentElement.scrollTop);
//       }
//       if (!topInView && window.innerHeight + document.documentElement.scrollTop > 1800) {
//         // set topInView to false
//         setScroll(window.innerHeight + document.documentElement.scrollTop);
//       }
//       if (!topInView && window.innerHeight + document.documentElement.scrollTop < 1800) {
//         // set topInView to false
//         // console.log(screen, 'yoo')
//         viewTop();
//       }
//       // if (error || isLoading || !hasMore) return;
//       // Checks that the page has scrolled to the bottom
//       if (
//         window.innerHeight + document.documentElement.scrollTop
//         >= document.documentElement.offsetHeight
//       ) {
//         // console.log('yoooooo')
//         // console.log(screen, 'yoo')
//         loadNext();
//       }
//     }
//   }, 750);
//   useEffect(() => {
//     if (screen === 'feed') {
//       window.addEventListener('scroll', scrollEvent, false);
//     } else {
//       console.log('CHANGED SCREEN')
//       window.removeEventListener('scroll', scrollEvent, false);
//     }
//   }, [screen]);


  let posts;
  // if (!feed) {
  //   // return loading icon
  // }
  posts = feed.map((post) => (
    <Post
      post={post}
    />
  ));

  return (
    <div style={styles.container} id="feed" >
      <div style={styles.header}>
        <i className="fa fa-camera fa-lg" aria-hidden="true" style={{ marginLeft: '4vw' }} onClick={() => store.dispatch({ type: 'ADD_POST' })} />
        <img
          style={styles.logo}
          src="https://res.cloudinary.com/instagrant/image/upload/v1593476991/Screen_Shot_2020-06-29_at_5.20.23_PM_emrmjz.png"
          alt="logo"
        />
        <i className="fa fa-paper-plane-o fa-lg" aria-hidden="true" style={{ marginRight: '4vw' }} />

      </div>
      {/* <div style={{marginTop: '10vh'}}>yo</div> */}
      {posts}
      {loading ? <CircularProgress /> : null}
      <div style={{ height: '10vh', marginTop: '3vh' }}/>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ view, feedInfo }) => {
  const { screen } = view;
  const { feed, topInView, loading } = feedInfo;
  return {
    screen,
    feed,
    topInView,
    loading,
  };
};

const mapDispatchToProps = {
  getFeed: addToFeed,
  startScroll: beginScroll,
  viewTop: setTopInView,
  loadNext: loadNextPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
