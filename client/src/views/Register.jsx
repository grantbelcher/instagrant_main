import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backIcon: {
    color: 'rgb(100, 100, 100)',
    marginLeft: '5vw',
  },
  header: {
    backgroundColor: '#eff0f1',
    top: 0,
    position: 'fixed',
    height: '8vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottom: 'solid',
    borderWidth: 'thin',
    borderColor: '#b3b4b5',
  },
  footer: {
    backgroundColor: '#eff0f1',
    bottom: 0,
    position: 'fixed',
    height: '10vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 5,
    borderTop: 'solid',
    borderWidth: 'thin',
    borderColor: '#b3b4b5',
  },
};

const Register = ({ changeView }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <i class="fa fa-chevron-left fa-2x" aria-hidden="true" style={styles.backIcon} onClick={() => changeView('Log In')} />
        <div style={{
          marginRight: '44vw',
        }}>Register</div>
      </div>
      <div style={styles.footer}>
        <div style={{
          color: '#8e8e8e',
          marginTop: '1vh',
          fontSize: 'smaller',
        }}
        >
          from
        </div>
        <div style={{
          marginTop: '1vh',
          fontSize: 'small',
        }}
        >
          GRANTBOOK
        </div>
      </div>
    </div>
  )
}

export default Register;
