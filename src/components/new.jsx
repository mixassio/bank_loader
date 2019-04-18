import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

class App extends React.Component {
  state = {
    uploadedFileContents: null,
    waitingForFileUpload: false
  };

  static readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };


  uploadFile = async (event) => {
    event.persist();

    if (!event.target || !event.target.files) {
      return;
    }

    this.setState({ waitingForFileUpload: true });

    const fileList = event.target.files;

    // Uploads will push to the file input's `.files` array. Get the last uploaded file.
    const latestUploadedFile = fileList.item(fileList.length - 1);

    try {
      const fileContents = await App.readUploadedFileAsText(latestUploadedFile);
      this.setState({
        uploadedFileContents: fileContents,
        waitingForFileUpload: false
      });
    } catch (e) {
      console.log(e);
      this.setState({
        waitingForFileUpload: false
      });
    }
  };

  render() {
    return (
      <div style={{ display: 'grid' }}>
        <input type="file" onChange={this.uploadFile} />
        <textarea
          readOnly
          value={
            this.state.uploadedFileContents
              ? this.state.uploadedFileContents
              : 'No contents to display.'
          }
          />
          {this.state.waitingForFileUpload && <span>Uploading file...</span>}
        </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
