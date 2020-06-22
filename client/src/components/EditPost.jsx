
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import EmptyButton from './EmptyButton';


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
    border: 'solid',
    borderColor: '#939393',
    borderWidth: 1,
    marginTop: '10vh',
    position: 'relative',
    height: 'auto',
    width: 'auto',
  },
  imgTemp: {
    border: 'solid',
    borderColor: '#939393',
    borderWidth: 1,
    width: '72vw',
    height: '100vw',
    marginTop: '10vh',
    backgroundColor: '#f0f0f0',
  },
};

class EditPost extends React.Component {
  constructor() {
    super();
    this.state = {
      src: null,
      crop: {
        unit: '%',
        width: 30,
        aspect: 4 / 3,
      },
    };
    this.onSelectFile = this.onSelectFile.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onCropComplete = this.onCropComplete.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.makeClientCrop = this.makeClientCrop.bind(this);
    this.getCroppedImg = this.getCroppedImg.bind(this);
  }

  onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => this.setState({ src: reader.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // If you setState the crop in here you should return false.
  onImageLoaded(image) {
    this.imageRef = image;
  }

  onCropComplete(crop) {
    this.makeClientCrop(crop);
  }

  onCropChange(crop, percentCrop) {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  }

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg',
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.maxWidth = '85vw';
    canvas.maxHeight = '63vh';
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          // reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  // comment
  render() {
    const { crop, croppedImageUrl, src } = this.state;
    console.log(src);
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <i className="fa fa-chevron-left fa-2x" aria-hidden="true" style={styles.backIcon} />
          <div style={{
            marginRight: '44vw',
          }}
          >
            Add a photo
          </div>
        </div>
        <div style={styles.hiddenInput}>
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        <EmptyButton styles={styles.buttonStyle} />
        <div style={src ? styles.imgContainer : styles.imgTemp}
        >
          {src ? (
          <img
            src={src}
            style={{
              maxWidth: '75vw',
              maxHeight: '56vh',
            }}
          />
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center',
            }}>
              <i class="fas fa-image fa-3x" style={{ color: '#939393' }} />
              <div style={{ marginTop: '4vh' }}>Preview will appear here.</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default EditPost;
