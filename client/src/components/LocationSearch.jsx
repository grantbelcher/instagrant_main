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
  const [location, setLocation] = useState(null);

  useEffect(() => {
    axios.get(`https://www.mapquestapi.com/search/v4/place?sort=relevance&feedback=false&key=WJNdcYkfrIa3bppQNxjGstg6ZJl86IaZ&limit=4&q=${text}`)
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
    if (!location) {
      setText(event.target.value);
    }
  };

  const selectLocation = (e) => {
    setLocation(e.target.innerText),
    setText(e.target.innerText);
    setResults([]);
  };

  const handleDelete = (e) => {
    if (e.key === 'Backspace') {
      setLocation(null);
    }
  };
  
  let listItems;
  if (results) {
    listItems = results.map((location, i) => (
      <ListItem button onClick={selectLocation}>
        <ListItemText primary={`${location}`} key={i + 1} />
      </ListItem>
    ));
  }

  console.log((listItems.length > 0 && location !== null), listItems.length > 0, location)
  return (
    <>
      <TextField
        id="Search Location"
        getOptionLabel={(option) => option.title}
        style={styles.input}
        label="Add Location"
        value={text}
        onKeyDown={handleDelete}
        onChange={(e) => searchLocation(e)}
      />
      {(listItems.length > 0) && (
        <Paper style={{
          width: '70vw',
          marginRight: '20vw',
          display: (location !== null ? 'none' : 'block')
        }}
        >
          <List>
            <ListItem button onClick={selectLocation}>
              <ListItemText primary={`${text}`} />
            </ListItem>
            {listItems}
          </List>
        </Paper>

      )}
    </>
  );
};

export default LocationSearch;
