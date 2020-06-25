import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';

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
};

const UserList = ({ userData }) => {
  if (!userData || userData.length === 0) {
    return (
      <div style={styles.loadingContainer}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      yoo
    </div>
  );
};

export default UserList;
