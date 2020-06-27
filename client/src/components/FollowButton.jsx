import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { startFollowing } from '../redux/actions/follow';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    paddingLeft: '20vw',
    paddingRight: '22vw',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const AlternateButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #c442bb 30%, #f77ea4 70%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    paddingLeft: '20vw',
    paddingRight: '22vw',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


const FollowButton = ({
  userId, profileId, followUser, following, myFollowers,
}) => {
  const alreadyFollowing = following.includes(profileId);
  const isFollowingMe = myFollowers.includes(profileId);
  const myProfile = (userId === profileId)
  let buttonText;
  if (isFollowingMe && !alreadyFollowing) {
    buttonText = 'Follow Back';
  } else if (alreadyFollowing) {
    buttonText = 'Unfollow';
  } else if (myProfile) {
    buttonText = 'Edit Profile';
  } else {
    buttonText = 'Follow';
  }
  const toggleFollow = () => {
    followUser(userId, profileId);
  };

  if (alreadyFollowing || myProfile) {
    return (
      <AlternateButton
        onClick={alreadyFollowing ? null : toggleFollow}
      >
        {buttonText}
      </AlternateButton>
    );
  }
  return (
    <StyledButton
      onClick={alreadyFollowing ? null : toggleFollow}
    >
      {buttonText}
    </StyledButton>
  );
};

const mapStateToProps = ({ auth, view, followStats }) => {
  const { userId } = auth;
  const { profileInfo } = view;
  const { userId: profileId } = profileInfo;
  const { following, myFollowers } = followStats;

  return {
    userId,
    profileId,
    following,
    myFollowers,
  };
};

const mapDispatchToProps = {
  followUser: startFollowing,
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
