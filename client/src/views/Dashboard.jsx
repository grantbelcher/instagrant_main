import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from '../redux/index';
import Footer from '../components/Footer';
import Post from '../components/Post';
import { addToFeed } from '../redux/actions/feed';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // height: '100vh',
    width: '100vw',
    // backgroundColor: 'red',
  },
  header: {
    backgroundColor: '#eff0f1',
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

const Dashboard = ({ feed, getFeed }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeed();
  }, []);
  let posts;
  // if (!feed) {
  //   // return loading icon
  // }
  posts = feed.map((post) => {
    return (
      <Post
        post={post}
      />
    );
  });
  return (
  <div style={styles.container}>
    <div style={styles.header}>
      <i class="fa fa-camera fa-lg" aria-hidden="true" style={{ marginLeft: '4vw' }} onClick={() => store.dispatch({ type: 'ADD_POST' })} />
      <img
        style={styles.logo}
        src="https://res.cloudinary.com/instagrant/image/upload/v1593476991/Screen_Shot_2020-06-29_at_5.20.23_PM_emrmjz.png"
        alt="logo"
      />
      <i class="fa fa-paper-plane-o fa-lg" aria-hidden="true" style={{ marginRight: '4vw' }} />
      
    </div>
    {/* <div style={{marginTop: '10vh'}}>yo</div> */}
    {posts}
    <Footer />
  </div>
  );
};

const mapStateToProps = ({ view, feedInfo }) => {
  const { screen } = view;
  const { feed } = feedInfo;
  return {
    screen,
    feed,
  };
};

const mapDispatchToProps = {
  getFeed: addToFeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
