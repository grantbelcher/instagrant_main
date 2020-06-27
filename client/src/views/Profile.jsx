import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Footer from '../components/Footer';
import FollowButton from '../components/FollowButton';

const Profile = ({ followers, following, photo }) => {

  return (
    <div>
      <Avatar src={photo} />
      <div>
        {`${followers.length} followers, ${following.length} following`}
      </div>
      <FollowButton />
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ view }) => {
  const { profileInfo } = view;
  const { followers, following, photo } = profileInfo;
  return {
    followers,
    following,
    photo,
  };
};

export default connect(mapStateToProps, null)(Profile);
