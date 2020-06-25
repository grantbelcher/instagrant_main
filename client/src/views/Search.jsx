import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Footer from '../components/Footer';
import store from '../redux/index';
import SearchUsers from '../components/SearchUsers';

const styles = {
  container: {
    height: '100vh',
    width: '100%',
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
    zIndex: 100,
  },
  logo: {
    height: '6vh',
    width: '35%',

  },
  avatarStyle: {
    height: '8vw',
    width: '8vw',
    marginRight: '1vw',
  },
};

const Search = ({ user, avatar }) => {
  console.log('yo');
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <i className="fa fa-chevron-left fa-lg" aria-hidden="true" style={{ marginLeft: '4vw' }} onClick={() => store.dispatch({ type: 'VIEW_FEED' })} />
        <div style={{
          fontSize: 'large',
        }}
        >
          Search
        </div>
        <i className="fa fa-paper-plane-o fa-lg" aria-hidden="true" style={{ marginRight: '4vw' }} />
      </div>
      <SearchUsers />
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user, userId, avatar } = auth;
  return {
    user,
    userId,
    avatar,
  };
};


export default connect(mapStateToProps, null)(Search);
