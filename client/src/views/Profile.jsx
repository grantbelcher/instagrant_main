import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Footer from '../components/Footer';
import FollowButton from '../components/FollowButton';

const Profile = ({ profileInfo }) => {
  return (
    <div>
      <Avatar src={profileInfo.photo}/>
      <FollowButton />
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ view }) => {
  const { profileInfo } = view;
  return {
    profileInfo,
  };
};

export default connect(mapStateToProps, null)(Profile);
