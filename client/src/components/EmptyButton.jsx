import React from 'react';

const styles = {
  container: {
    height: '5vh',
    width: '100%',
    backgroundColor: '#4fa9f6',
    textAlign: 'center',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5vh',
  },
};


function EmptyButton() {
  return (
    <div style={styles.container}>
      Next
    </div>
  );
}

export default EmptyButton;
