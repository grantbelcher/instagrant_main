import React from 'react';
import Footer from '../components/Footer'


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
    justifyContent: 'space-around',
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

const Dashboard = () => (
  <div style={styles.container}>
    <div style={styles.header}>
      <img
        style={styles.logo}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
        alt="logo"
      />
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

export default Dashboard;
