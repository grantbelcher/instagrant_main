import React from 'react'

const styles = {
  footer: {
    backgroundColor: '#eff0f1',
    top: '85vh',
    position: 'fixed',
    width: '100vw',
    height: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 5,
    borderTop: 'solid',
    borderWidth: 'thin',
    borderColor: '#b3b4b5',
  },
}

const Footer = () => {
  return (
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
  )
}

export default Footer;
