import fs from 'fs';
import axios from 'axios';
import url from 'url';
import path from 'path';
import debug from 'debug';
import { DOMParser } from 'xmldom';


const log = debug('page-loader:app');

const downloadPage = async (uri, pathDirSave) => {
  const banksXML = await axios.get(uri, { responseEncoding: 'CP1251' });
  console.log(banksXML)
  const parser = new DOMParser();
  const doc = parser.parseFromString(banksXML.data, 'text/xml');
  // console.log(doc);
};

export default downloadPage;
