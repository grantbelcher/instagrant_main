import React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { viewProfile } from '../redux/actions/view';


const styles = {
  container: {
    marginLeft: '2vw',
    marginRight: '2vw',
  },
  loadingContainer: {
    height: '30vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
  },
};

const UserList = ({ userData, suggestedUsers, goToProfile }) => {
  if (!userData.length && !suggestedUsers.length) {
    return (
      <div style={styles.loadingContainer}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  let userList;

  if (userData.length === 0 && suggestedUsers.length > 0) {
    userList = suggestedUsers.map((user) => (
      <ListItem
        button
        onClick={() => goToProfile(user.userId)}
      >
        <ListItemAvatar>
          <Avatar alt={user.fullname} src={user.photo} />
        </ListItemAvatar>
        <ListItemText
          primary={user.username}
          secondary={user.fullname}
        />
      </ListItem>
    ));
  }
  userList = userData.map((user) => (
    <ListItem
      button
      onClick={() => goToProfile(user.userId)}
    >
      <ListItemAvatar>
        <Avatar alt={user.fullname} src={user.photo} />
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        secondary={user.fullname}
      />
    </ListItem>

  ));
  return (
    <div style={styles.container}>
      {userList}
    </div>
  );
};


const mapDispatchToProps = {
  goToProfile: viewProfile,
};

export default connect(null, mapDispatchToProps)(UserList);
