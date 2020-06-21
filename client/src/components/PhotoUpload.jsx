import React from 'react';
import CustomButton from '../components/CustomButton';

function buildFileSelector() {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  return fileSelector;
}

class FileDialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
    };
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  componentDidMount() {
    this.fileSelector = buildFileSelector();
  }

  handleFileSelect(e) {
    e.preventDefault();
    this.fileSelector.click();
  }

  render() {
    return <a onClick={this.handleFileSelect}>Select files</a>;
  }
}

export default FileDialogue;
