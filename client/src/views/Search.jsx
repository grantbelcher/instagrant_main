import React from 'react';
import Footer from '../components/Footer';

const styles = {
  container: {
    backgroundColor: 'red',
  },
};

const Search = () => {
  console.log('yo');
  return (
    <div style={styles.container}>
      <div>search</div>
      <Footer />
    </div>
  );
};

export default Search;
