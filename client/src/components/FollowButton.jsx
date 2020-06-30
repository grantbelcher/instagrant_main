import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { startFollowing, unfollow } from '../redux/actions/follow';
import { updateFollowStats } from '../redux/actions/view';


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
  userId, profileId, followUser, following, myFollowers, unFollowUser, updateFollowData
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
    // if (myProfile) {
    //   console.log('yo');
    // }
    if (alreadyFollowing) {
      unFollowUser(userId, profileId);
      updateFollowData(userId, true);
    } else {
      followUser(userId, profileId);
      updateFollowData(userId, false);
    }
  };

  if (alreadyFollowing) {
    return (
      <AlternateButton
        onClick={toggleFollow}
      >
        {buttonText}
      </AlternateButton>
    );
  }
  return (
    <StyledButton
      onClick={toggleFollow}
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
  unFollowUser: unfollow,
  updateFollowData: updateFollowStats,
};


export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
