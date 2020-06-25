import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [text, setText] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      if (text.length < 2) {
        return;
      }
      const response = await axios.get(`/users/search/${text}`);
      console.log(response.data, 'yooooo');
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [text]);


  useEffect(async () => {
    try {
      const response = await axios.get(`/users/suggestions`);
      console.log(response.data, 'after call');
      setTimeout(() => {
        setUsers(response.data);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <div>
      <div style={styles.searchContainer}>
        <Input
          id="username"
          variant="outlined"
          style={styles.input}
          placeholder="Search Users"
          onChange={(e) => setText(e.target.value)}
          value={text}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton>
                <i className="fa fa-search" aria-hidden="true" />
              </IconButton>
            </InputAdornment>
          )}
        />
      </div>
      <UserList userData={users} searchUsers={true} />
    </div>
  );
};

export default SearchUsers;
