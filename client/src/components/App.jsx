import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import debounce from 'lodash.debounce';
import Dashboard from '../views/Dashboard';
import { loadUser } from '../redux/actions/auth';
import store from '../redux/index';
import SocketContext from '../context/index';
import Auth from '../views/Auth';
import Profile from '../views/Profile';
import Post from './Post';
import EditPost from './EditPost';
import AddCaption from '../views/AddCaption';
import EditProfile from '../views/EditProfile';
import Search from '../views/Search';
import { loadFollowStats } from '../redux/actions/follow';
import {
  addToFeed, loadNextPosts, beginScroll, setTopInView, checkNewMessages,
} from '../redux/actions/feed';
// import setAuthToken from '../../../utils/setAuthToken';


// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const socketUrl = '/';

const socket = io(socketUrl);


const App = ({
  isLoggedIn, userId, screen, loadFollowData, feed, topInView, getFeed, startScroll, viewTop, loadNext, endOfFeed, following, checkNewMessage,
}) => {
  let currentView;


  if (!screen) {
    return <Auth />;
  }
  useEffect(() => {
    const initSocket = () => {
      // let followingString;
      console.log(store.getState().followStats, 'GET STATE');
      socket.on('NEW_POST_RECIEVED', (post) => {
        console.log(post, 'SOCKET EVENT');
        checkNewMessage(post, store.getState().followStats);
      });
    };
    initSocket();
  }, []);
  // let string;
  // if (screen === 'feed') {
  //   if (following.length > 0) {
  //     string = following.reduce((acc, id) => `${acc} ${id},`, '');
  //   }
  // }



  useEffect(() => {
    const scrollEvent = debounce(() => {
      console.log(window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight, 'look here');
      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      const bottomOfPage = feed.length * window.innerHeight - 1800;
      console.log(bottomOfPage);
      if (screen === 'feed') {
        if (topInView && window.innerHeight + document.documentElement.scrollTop > 1800) {
          // set topInView to false
          console.log('scrolling begins');
          startScroll(document.documentElement.scrollTop);
        }
        if (!topInView && window.innerHeight + document.documentElement.scrollTop < 800) {
          viewTop();
        }
        // if (error || isLoading || !hasMore) return;
        // Checks that the page has scrolled to the bottom
        // if (
        //   window.innerHeight + document.documentElement.scrollTop
        //   >= bottomOfPage
        // ) {
        //   console.log('loading next');
        //   // console.log('yoooooo')
        //   // console.log(screen, 'yoo')
        //   loadNext();
        // }
      }
    }, 1200);
    window.onscroll = null;
    if (screen === 'feed') {
      // window.addEventListener('scroll', scrollEvent, false);
      if (endOfFeed) {
        window.onscroll = null;
      } else {
        window.onscroll = scrollEvent;
      }
    } else {
      console.log('removing event');
      window.onscroll = null;
    }
  }, [screen, feed, endOfFeed]);

  if (screen === 'feed') {
    currentView = <Dashboard />;
  } else if (screen === 'profile') {
    currentView = <Profile />;
  } else if (screen === 'new post') {
    currentView = <EditPost />;
  } else if (screen === 'add profile pic') {
    currentView = <EditPost />;
  } else if (screen === 'add caption') {
    currentView = <AddCaption inRegistration={false} />;
  } else if (screen === 'my profile') {
    currentView = <Profile />;
  } else if (screen === 'post') {
    currentView = <Post />;
  } else if (screen === 'search') {
    currentView = <Search />;
  } else if (screen === 'edit profile') {
    currentView = <EditProfile />;
  } else if (screen === 'new profile pic') {
    currentView = <EditPost newProfilePic={true} inRegistration={false} />;
  } else if (screen === 'new avatar') {
    currentView = <AddCaption inRegistration={false} newAvatar={true} />;
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Auth />}
        </Route>
        <Route path="/dashboard">
          <SocketContext.Provider value={socket}>
            {currentView}
          </SocketContext.Provider>
        </Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { view, feedInfo } = state;
  const { screen } = view;
  const { feed, topInView, endOfFeed } = feedInfo;
  const { isLoggedIn, userId } = state.auth;
  const { following } = state.followStats;

  return {
    isLoggedIn,
    screen,
    feed,
    topInView,
    endOfFeed,
    following,
  };
};

const mapDispatchToProps = {
  loadFollowData: loadFollowStats,
  getFeed: addToFeed,
  startScroll: beginScroll,
  viewTop: setTopInView,
  loadNext: loadNextPosts,
  checkNewMessage: checkNewMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
