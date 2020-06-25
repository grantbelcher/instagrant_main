import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconButton } from '@material-ui/core';
import UserList from './UserList';

const styles = {
  searchContainer: {
    height: '8vh',
    width: '100%',
    marginTop: '9vh',
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    // marginTop: '-1vh',
    fontSize: 'smaller',
    // width: '75vw',
    height: '7vh',
    borderColor: '#fafafa',
    marginRight: '2vw',
    marginLeft: '2vw',
    marginTop: '1vh',
    paddingLeft: '2vw',
    borderRadius: '5px',
    backgroundColor: 'rgb(240, 240, 240)',
    width: '96vw',
  },
};

const SearchUsers = () => {
  console.log('yooo');
  return (
    <div>
      <div style={styles.searchContainer}>
        <Input
          id="username"
          variant="outlined"
          style={styles.input}
          placeholder="Search Users"
          endAdornment={(
            <InputAdornment position="end">
              <IconButton>
                <i class="fa fa-search" aria-hidden="true" />
              </IconButton>
            </InputAdornment>
          )}
        />
      </div>
      <UserList />
    </div>
  );
};

export default SearchUsers;
