
import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import store from '../redux/index';
import EmptyButton from './EmptyButton';
import { selectPhoto, addNewAvatar } from '../redux/actions/upload';
import Footer from './Footer';

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
  buttonStyle: {
    height: '5vh',
    width: '85vw',
    backgroundColor: '#4fa9f6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    marginTop: '15vh',
  },
  hiddenInput: {
    zIndex: 100,
    marginTop: '15vh',
    opacity: 0,
  },
  input: {
    width: '100vw',
  },
  imgContainer: {
    position: 'fixed',
    border: 'solid',
    borderColor: '#3d3d3d',
    borderWidth: 1,
    marginTop: '25vh',
    // position: 'relative',
    height: '100vw',
    width: '85vw',
  },
  imgTemp: {
    position: 'fixed',
    border: 'solid',
    borderColor: '#939393',
    borderWidth: 1,
    height: '100vw',
    width: '85vw',
    marginTop: '25vh',
    backgroundColor: '#f0f0f0',
  },
  nextButton: {
    marginRight: '5vw',
    color: 'rgb(79, 169, 246)',
    fontWeight: 700,
    fontSize: 'large',
  },
  // nextButton: {
  //   marginRight: '5vw',
  //   color: 'rgb(79, 169, 246)',
  //   fontWeight: 700,
  //   fontSize: 'large',
  // },
};

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // src: null,
      image: null,
      crop: {
        unit: '%',
        width: 30,
        aspect: 4 / 3,
      },
      loading: false,
    };
    this.onSelectFile = this.onSelectFile.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.navigateForward = this.navigateForward.bind(this);
    // this.onImageLoaded = this.onImageLoaded.bind(this);
    // this.onCropComplete = this.onCropComplete.bind(this);
    // this.onCropChange = this.onCropChange.bind(this);
    // this.makeClientCrop = this.makeClientCrop.bind(this);
    // this.getCroppedImg = this.getCroppedImg.bind(this);
  }

  componentDidMount() {
    console.log(this.props.newProfilePic, 'COMPONENT DID MOUNT')
  }

  onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const { files } = e.target;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'instagrant');
      this.setState({
        loading: true,
      });
      fetch(
        'https://api.cloudinary.com/v1_1/instagrant/image/upload',
        {
          method: 'POST',
          body: data,
        },
      )
        .then((res) => {
          res.json()
            .then((file) => {
              this.setState({
                image: file.secure_url,
                loading: false,
              });
            });
        });
    }
  }

  navigateForward() {
    if (this.props.inRegistration) {
      this.props.addFile(this.state.image);
    } else if (this.props.newProfilePic) {
      console.log(this.props.addNewAvatar)
      this.props.addNewAvatar(this.state.image);
    } else {
      this.props.selectPhoto(this.state.image);
    }
  }

  navigateBack() {
    console.log(this.props.inRegistration, this.props.newProfilePic, 'NAVIGATING BACK')
    if (this.props.inRegistration) {
      store.dispatch({ type: 'LOG_IN' });
    } else if (this.props.newProfilePic) {
      console.log(' CONDITION MET')
      store.dispatch({ type: 'BACK_TO_PROFILE' });
    } else {
      store.dispatch({ type: 'VIEW_FEED' });
    }
  }

  render() {
    const {
      crop, croppedImageUrl, image, loading,
    } = this.state;
    const { changeView } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <i className="fa fa-chevron-left fa-2x" aria-hidden="true" style={styles.backIcon} onClick={() => this.navigateBack()} />
          <div style={{
            fontSize: 'large',
          }}
          >
            New Post
          </div>
          <a
            style={image ? styles.nextButton : { opacity: 0 }}
            onClick={() => {
              this.navigateForward();
            }}
          >
            Next
          </a>
        </div>
        <div style={styles.hiddenInput}>
          <input type="file" name="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        <EmptyButton styles={styles.buttonStyle} onClick={changeView} />
        <div style={image ? styles.imgContainer : styles.imgTemp}>
          {image ? (
            <img
              src={image}
              style={{
                maxWidth: '85vw',
                maxHeight: '100vw',
                height: '100vw',
                width: '85vw',
              }}
            />
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center',
            }}
            >
              { loading ? <CircularProgress /> : (
                <>
                  <i className="fas fa-image fa-3x" style={{ color: '#939393' }} />
                  <div style={{ marginTop: '4vh' }}>Preview will appear here.</div>
                </>
              )}
            </div>
          )}
        </div>
        {/* {this.props.inRegistration ? null : <Footer />} */}
      </div>
    );
  }
}

const mapDispatchToProps = {
  selectPhoto,
  addNewAvatar,
};

export default connect(null, mapDispatchToProps)(EditPost);
