import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
    position: 'fixed',
    zIndex: '100',
  },
};

const SearchUsers = () => {
  const [text, setText] = useState('');
  const [users, setUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/users/search/${text}`);
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (text.length < 1) {
      setUsers(suggestions);
      return;
    }
    handleSearch();
  }, [text]);


  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const response = await axios.get(`/users/suggestions`);
        console.log(response.data, 'after call');
        setTimeout(() => {
          setUsers(response.data);
          setSuggestions(response.data);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    getSuggestions();
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
      <UserList userData={users} searchUsers={true} suggestedUsers={suggestions} />
    </div>
  );
};

export default SearchUsers;
