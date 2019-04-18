import Papa from 'papaparse';
import _ from 'lodash';

export const XMLChangeOLD = async (e) => {
  const fReaderXML = new FileReader();
  await fReaderXML.readAsText(e.target.files[0], 'CP1251');
  fReaderXML.onloadend = (event2) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(event2.target.result, 'application/xml');
    const items = doc.querySelectorAll('BICDirectoryEntry');
    const banksNew = [...items].map((item) => {
      const info = item.querySelector('ParticipantInfo');
      // console.log(item.getAttribute('BIC'), [...info.attributes]);
      const bankInfo = [...info.attributes].reduce((acc, el) => (
        { ...acc, [el.name]: el.textContent }
      ), {});
      // console.log(bankInfo.PtType, stat[bankInfo.PtType])
      const accountsList = item.querySelectorAll('Accounts');
      const accounts = [...accountsList]
        .map(account => [...account.attributes].reduce((acc, el) => (
          { ...acc, [el.name]: el.textContent }
        ), {}));
      this.setState({ [bankInfo.PtType]: [...this.state[bankInfo.PtType], { ...bankInfo, accounts, bic: item.getAttribute('BIC') }] });
      return { ...bankInfo, accounts, bic: item.getAttribute('BIC') };
    });
    this.setState({ banksNew });
  };
};

export const CSVChangeOLd = async (e) => {
  const fReaderCSV = new FileReader();
  await fReaderCSV.readAsText(e.target.files[0]);
  fReaderCSV.onloadend = (event) => {
    const dataParsed = Papa.parse(event.target.result, { encoding: 'utf-8' });
    // console.log(dataParsed.data);
    const { data: [keys, ...values] } = dataParsed;
    // state.currentBanksBD = values.map(bank => _.zipObject(keys, bank));
    this.setState({ currentBanksBD: values.map(bank => _.zipObject(keys, bank)) });
    console.log('doneCSV');
  };
};
