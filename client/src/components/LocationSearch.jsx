import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

const styles = {
  input: {
    marginTop: '10vh',
    marginRight: '10vw',
    width: '80vw',
  },
};


const LocationSearch = () => {
  const [results, setResults] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(`https://www.mapquestapi.com/search/v4/place?sort=relevance&feedback=false&key=WJNdcYkfrIa3bppQNxjGstg6ZJl86IaZ&limit=5&q=${text}`)
      .then((response) => {
        const { data } = response;
        return data.results.map((location) => location.name);
      })
      .then((locations) => setResults([...locations]))
      .catch((err) => {
        setResults([]);
        console.error(err, 'errr');
      });
  }, [text]);

  const searchLocation = (event) => {
    console.log(event.target.value, 'yooo');
    setText(event.target.value);
  };

  let listItems;
  if (results) {
    listItems = results.map((location) => (
      <ListItem button>
        <ListItemText primary={`${location}`} />
      </ListItem>
    ));
  }

  return (
    <>
      <TextField
        id="Search Location"
        getOptionLabel={(option) => option.title}
        style={styles.input}
        label="Search Location"
        value={text}
        onChange={(e) => searchLocation(e)}
      />
      {listItems.length && (
        <Paper style={{
          width: '70vw',
          marginRight: '20vw',
        }}
        >
          <List>
            {listItems}
          </List>
        </Paper>

      )}
    </>
  );
};

export default LocationSearch;
