import React from 'react';
import Papa from 'papaparse';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingForCSVUpload: false,
      waitingForXMLUpload: false,
      currentBanksBD: [],
      banksNew: [],
      '00': [],
      '10': [],
      '12': [],
      '15': [],
      '16': [],
      '20': [],
      '30': [],
      '40': [],
      '51': [],
      '52': [],
      '60': [],
      '65': [],
      '71': [],
      '75': [],
      '78': [],
      '90': [],
      '99': [],
    };
  }

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

  CSVChange = async (e) => {
    const fileList = e.target.files;
    this.setState({ waitingForCSVUpload: true });
    const latestUploadedFile = fileList.item(fileList.length - 1);
    try {
      const fileContents = await App.readUploadedFileAsText(latestUploadedFile);
      const dataParsed = Papa.parse(fileContents, { encoding: 'utf-8' });
      const { data: [keys, ...values] } = dataParsed;
      this.setState({
        currentBanksBD: values.map(bank => _.zipObject(keys, bank)),
        waitingForCSVUpload: false,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        waitingForCSVUpload: false,
      });
    }
  };

  XMLChange = async (e) => {
    const fileList = e.target.files;
    this.setState({ waitingForXMLUpload: true });
    const latestUploadedFile = fileList.item(fileList.length - 1);
    try {
      const fileContents = await App.readUploadedFileAsText(latestUploadedFile);
      const parser = new DOMParser();
      const doc = parser.parseFromString(fileContents, 'application/xml');
      const items = doc.querySelectorAll('BICDirectoryEntry');
      const banksNew = [...items].map((item) => {
        const info = item.querySelector('ParticipantInfo');
        const bankInfo = [...info.attributes].reduce((acc, el) => (
          { ...acc, [el.name]: el.textContent }
        ), {});
        const accountsList = item.querySelectorAll('Accounts');
        const accounts = [...accountsList]
          .map(account => [...account.attributes].reduce((acc, el) => (
            { ...acc, [el.name]: el.textContent }
          ), {}));
        this.setState({ [bankInfo.PtType]: [...this.state[bankInfo.PtType], { ...bankInfo, accounts, bic: item.getAttribute('BIC') }] });
        return { ...bankInfo, accounts, bic: item.getAttribute('BIC') };
      });
      this.setState({ banksNew, waitingForXMLUpload: false });
    } catch (err) {
      console.log(err);
      this.setState({
        waitingForXMLUpload: false,
      });
    }
  };

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Bank loader</h1>
        <hr className="my-4" />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="file" className="form-control-file" onChange={this.CSVChange} />
            <input type="file" className="form-control-file" onChange={this.XMLChange} />
            <button type="submit" className="btn btn-primary mb-2 submit">Add</button>
          </div>
        </form>
        {this.state.waitingForXMLUpload && <span>Uploading XML...</span>}
        {this.state.waitingForCSVUpload && <span>Uploading CSV...</span>}
      </div>
    );
  }
}

export default App;
