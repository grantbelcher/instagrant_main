import React from 'react';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  backIcon: {
    color: 'rgb(100, 100, 100)',
    marginLeft: '4vw',
  },
  nextButton: {
    marginRight: '5vw',
    color: 'rgb(79, 169, 246)',
    fontWeight: 700,
    fontSize: 'large',
  },
};

const AddCaption = ({ file, changeView }) => {
  console.log(file, 'look here!!!!!');
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <i className="fa fa-chevron-left fa-2x" aria-hidden="true" style={styles.backIcon} onClick={() => changeView('Edit Pic')}/>
        <div style={{
          fontSize: 'large',
        }}
        >
          New Post
        </div>
        <a
          style={styles.nextButton}
          // onClick={() => {
          //   this.props.addFile(this.state.src);
          // }}
        >
          Share
        </a>
      </div>
      {/* <img src={file} /> */}
    </div>
  );
};

export default AddCaption;
