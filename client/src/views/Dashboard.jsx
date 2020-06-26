import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import store from '../redux/index'
import Footer from '../components/Footer';
import { loadFeed } from '../redux/actions/feed';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'red',
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
    borderColor: '#b3b4b5',
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

const Dashboard = ({ getFeed }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getFeed();
  }, []);
  return (
  <div style={styles.container}>
    <div style={styles.header}>
      <i class="fa fa-camera fa-lg" aria-hidden="true" style={{ marginLeft: '4vw' }} onClick={() => store.dispatch({ type: 'ADD_POST' })} />
      <img
        style={styles.logo}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
        alt="logo"
      />
      <i class="fa fa-paper-plane-o fa-lg" aria-hidden="true" style={{ marginRight: '4vw' }} />
      
    </div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh'}}>yo</div>
    <div style={{marginTop: '10vh', marginBottom: '20vh'}}>yo</div>
    <Footer />
  </div>
  );
};

const mapStateToProps = ({ view, feed }) => {
  const { screen } = view;
  return {
    screen,
    feed,
  };
};

const mapDispatchToProps = {
  getFeed: loadFeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
