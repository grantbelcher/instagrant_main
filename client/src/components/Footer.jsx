import React from 'react'
import Avatar from '@material-ui/core/Avatar';

const styles = {
  footer: {
    backgroundColor: '#eff0f1',
    top: '90vh',
    position: 'fixed',
    width: '100vw',
    height: '10vh',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // paddingTop: 5,
    borderTop: 'solid',
    borderWidth: 'thin',
    borderColor: '#b3b4b5',
  },
  icons: {
    marginTop: '3vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
};

const Footer = () => {
  return (
    <div style={styles.footer}>
      <div style={styles.icons}>
        <i class="fa fa-home fa-lg" aria-hidden="true"/>
        <i class="fa fa-search fa-lg" aria-hidden="true"/>
        <i class="fa fa-plus-square fa-lg" aria-hidden="true" />
        <i class="fa fa-plus-square fa-lg" aria-hidden="true" />
        <i class="fa fa-plus-square fa-lg" aria-hidden="true" />
      </div>
    </div>
  )
}

export default Footer;
