import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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


const FollowButton = ({ userId, thisUsersId }) => {
  const buttonText = 'Follow';
  // define call that makes axios
  // const followUser

  return (
    <StyledButton>
      {buttonText}
    </StyledButton>
  );
};

const mapStateToProps = ({ auth, view }) => {
  const { userId } = auth;
  const { profileInfo } = view;
  const { thisUsersId } = profileInfo;
  return {
    userId,
    thisUsersId,
  };
};



export default connect(mapStateToProps, null)(FollowButton);
