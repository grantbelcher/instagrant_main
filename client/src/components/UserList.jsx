import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  container: {
    marginLeft: '2vw',
    marginRight: '2vw',
    backgroundColor: 'aliceblue',
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

const UserList = ({ userData, suggestedUsers }) => {
  if (!userData) {
    return (
      <div style={styles.loadingContainer}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
  let userList;

  if (userData.length === 0 && suggestedUsers.length > 0) {
    userList = suggestedUsers.map((user) => (
      <ListItem>
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
    <ListItem>
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

export default UserList;
