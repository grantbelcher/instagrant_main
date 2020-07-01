import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Footer from '../components/Footer';
import FollowButton from '../components/FollowButton';

const Profile = ({ profileInfo }) => {
  const {
    followers, following, photo, title, username, fullname, bio, posts,
  } = profileInfo;
  return (
    <div>
      <Avatar src={photo} />
      <div>
        {`${fullname},  ${username}, ${title}, ${bio}`}
        {`${posts} posts, ${followers.length} followers, ${following.length} following`}
      </div>
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
