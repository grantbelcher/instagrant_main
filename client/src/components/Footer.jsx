import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import store from '../redux/index';
import { viewProfile } from '../redux/actions/view';
import { signOut } from '../redux/actions/auth';

const styles = {
  footer: {
    backgroundColor: '#eff0f1',
    top: '0',
    position: 'fixed',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    height: '6vh',
    paddingBottom: '2.5vh',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // paddingTop: 5,
    borderTop: 'solid',
    borderWidth: 'thin',
    borderColor: '#b3b4b5',
  },
  icons: {
    // marginTop: '3vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  avatarIcon: {
    height: '4vh',
    width: '4vh',
  }
};

const Footer = ({ avatar, user, userId, goToProfile, logOut }) => {
  return (
    <div style={styles.footer}>
      <div style={styles.icons}>
        <i class="fa fa-door-open fa-lg" aria-hidden="true" onClick={() => logOut()} />
        <i class="fa fa-search fa-lg" aria-hidden="true" onClick={() => store.dispatch({ type: 'SEARCH_PROFILES' })} />
        <i class="fa fa-home fa-lg" aria-hidden="true" onClick={() => store.dispatch({ type: 'VIEW_FEED' })} />
        <i class="fa fa-plus-square fa-lg" aria-hidden="true" onClick={() => store.dispatch({ type: 'ADD_POST' })} />
        <IconButton onClick={() => goToProfile(userId)}>
          <Avatar src={avatar} alt={user} style={styles.avatarIcon} />
        </IconButton>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { user, userId, avatar } = auth;
  return {
    avatar,
    user,
    userId,
  };
};

const mapDispatchToProps = {
  goToProfile: viewProfile,
  logOut: signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
