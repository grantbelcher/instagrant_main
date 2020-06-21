import React, {
  useState, Fragment, useEffect, useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import EmptyButton from './EmptyButton';


const styles = {
  input: {
    backgroundColor: 'red',
    position: 'fixed',
    top: '58vh',
    height: '15vh',
    zIndex: 10000,
    display: 'none',
  }
}

const NewPostButton = ({
  showModal, hideModal, plusIcon, children, style,
}) => {
  const [file, setFile] = useState(undefined);
  const fileInputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    if (file) {
      console.log(file);
      // Resetting the input value so you are able to
      // use the same file twice
      fileInputRef.current.value = '';
    }
  }, [file]);
  return (
    <div style={{width: '75%'}}>
      <label
        style={{ cursor: 'pointer', ...style }}
        htmlFor="file-upload"
      >
      <EmptyButton />
      </label>
      <input
        id="file-upload"
        className="button"
        type="file"
        style={styles.input}
        accept="image/*"
        // Get the first selected file
        onChange={(event) => setFile(event.target.files[0])}
        ref={fileInputRef}
      />
    </div>
  );
};

export default NewPostButton;
