import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Dashboard from '../views/Dashboard';
import { loadUser } from '../redux/actions/auth';
import store from '../redux/index';
import Auth from '../views/Auth';
import Profile from '../views/Profile';
import Post from './Post';
import EditPost from './EditPost';
import AddCaption from '../views/AddCaption';
import Search from '../views/Search';
import { loadFollowStats } from '../redux/actions/follow';
import {
  addToFeed, loadNextPosts, beginScroll, setTopInView,
} from '../redux/actions/feed';
// import setAuthToken from '../../../utils/setAuthToken';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

// const mapStateToProps = (state) => {
//   const { view, feedInfo } = state
//   const { screen } = view;
//   const { feed, topInView } = feedInfo;
//   const { isLoggedIn, userId } = state.auth;
//   return {
//     isLoggedIn,
//     screen,
//     feed,
//     topInView,
//   };
// };

// const mapDispatchToProps = {
//   loadFollowData: loadFollowStats,
//   getFeed: addToFeed,
//   startScroll: beginScroll,
//   viewTop: setTopInView,
//   loadNext: loadNextPosts,
// };

const App = ({
  isLoggedIn, userId, screen, loadFollowData, feed, topInView, getFeed, startScroll, viewTop, loadNext, endOfFeed,
}) => {
  let currentView;
  if (!screen) {
    return <Auth />;
  }


  useEffect(() => {
    const scrollEvent = debounce(() => {
      console.log(window.innerHeight + document.documentElement.scrollTop, document.documentElement.offsetHeight, 'look here');
      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      const bottomOfPage = feed.length * window.innerHeight - 1800;
      console.log(bottomOfPage)
      if (screen === 'feed') {
        if (topInView && window.innerHeight + document.documentElement.scrollTop > 1800) {
          // set topInView to false
          console.log('scrolling begins')
          startScroll(document.documentElement.scrollTop);
        }
        if (!topInView && window.innerHeight + document.documentElement.scrollTop < 800) {
          // set topInView to false
          // console.log(screen, 'yoo')
          console.log('top in view')
          viewTop();
        }
        // if (error || isLoading || !hasMore) return;
        // Checks that the page has scrolled to the bottom
        if (
          window.innerHeight + document.documentElement.scrollTop
          >= bottomOfPage
        ) {
          console.log('loading next')
          // console.log('yoooooo')
          // console.log(screen, 'yoo')
          loadNext();
        }
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
  }
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Auth />}
        </Route>
        <Route path="/dashboard">
          {currentView}
        </Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { view, feedInfo } = state
  const { screen } = view;
  const { feed, topInView, endOfFeed } = feedInfo;
  const { isLoggedIn, userId } = state.auth;
  return {
    isLoggedIn,
    screen,
    feed,
    topInView,
    endOfFeed,
  };
};

const mapDispatchToProps = {
  loadFollowData: loadFollowStats,
  getFeed: addToFeed,
  startScroll: beginScroll,
  viewTop: setTopInView,
  loadNext: loadNextPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
