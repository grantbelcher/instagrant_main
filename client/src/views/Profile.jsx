import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Footer from '../components/Footer';

const Profile = ({ profileInfo }) => {
  console.log(profileInfo);
  return (
    <div>
      <Avatar src={profileInfo.photo}/>
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
