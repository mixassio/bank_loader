import React from 'react';
import Papa from 'papaparse';
import _ from 'lodash';
import parserBank from '../lib/parser';
import readUploadedFileAsText from '../lib/loaderFile';
import modelContragents from '../lib/modelContragents';
import checkOneContragent from '../lib/checkOneContragent';

class Contragents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingForCSVUpload: false,
      contragentsChecked: [],
      contagentsNew: [],
      fileLoad: false,
      header: Object.keys(modelContragents({})),
      checkingTimeDaData: false,
    };
  }

  CSVChange = async (e) => {
    const fileList = e.target.files;
    this.setState({ waitingForCSVUpload: true });
    const latestUploadedFile = fileList.item(fileList.length - 1);
    try {
      const fileContents = await readUploadedFileAsText(latestUploadedFile);
      const dataParsed = Papa.parse(fileContents, { encoding: 'utf-8' });
      const { data: [keys, ...values] } = dataParsed;
      console.log(keys, values);
      this.setState({
        waitingForCSVUpload: false,
        contragentsChecked: values.map(bank => _.zipObject(keys, bank)),
        fileLoad: true,
        header: [...keys, ...this.state.header],
      });
      console.log(this.state);
    } catch (err) {
      console.log(err);
      this.setState({
        waitingForCSVUpload: false,
      });
    }
  };

  checkDadata = async () => {
    // список загруженных для проверки
    const { contragentsChecked } = this.state;
    this.setState({
      checkingTimeDaData: true,
    });

    const newCs = contragentsChecked.map(async ({ INN_OLD, OGRN_OLD, KPP_OLD }) => {
      // проверка по инн или огрн, выдает список всех
      const newC = await checkOneContragent(INN_OLD || OGRN_OLD);
      // ищем в этом списке одного по условию
      const trueC = newC.find(({ kpp, branch_type, type }) => kpp === KPP_OLD || branch_type === 'MAIN' || type === 'INDIVIDUAL');
      // если нет, то заполняем поля пустыми значениями
      if (!trueC) {
        return {
          INN_OLD, OGRN_OLD, KPP_OLD, ...modelContragents({}),
        };
      }
      // this.setState({
      //   contagentsNew: [
      //     ...this.state.contagentsNew,
      //     {
      //       INN_OLD,
      //       OGRN_OLD,
      //       KPP_OLD,
      //       ...trueC,
      //     },
      //   ],
      // });
      return {
        INN_OLD, OGRN_OLD, KPP_OLD, ...trueC,
      };
    });
    this.setState({
      contagentsNew: await Promise.all(newCs),
      checkingTimeDaData: false,
    });
  }

  downloadTxtFile = () => {
    console.log(this.state);
    const { contagentsNew, header } = this.state;
    const myData = [header.join(';'), ...contagentsNew.map(contr => Object.values(contr).join(';'))].join('\r\n');
    console.log(myData);
    const element = document.createElement('a');
    const file = new Blob([myData], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'myFile.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Contragents</h1>
        <hr className="my-4" />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <span>Contragents.csv INN, KPP, OGRN</span>
            <input type="file" className="form-control-file" onChange={this.CSVChange} />
            <button type="submit" hidden className="form-control-btn submit">check in dadata.ru</button>
          </div>
        </form>
        <button type="button" disabled={!this.state.fileLoad} onClick={this.checkDadata} className="form-control-btn submit">check in dadata.ru</button>
        <button type="button" onClick={this.downloadTxtFile}>Download Contragents</button>
        {this.state.waitingForCSVUpload && <span>Uploading CSV...</span>}
        {this.state.checkingTimeDaData && <span>Идут запросы на сервер, ждите</span>}
      </div>
    );
  }
}

export default Contragents;
