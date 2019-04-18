import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import React from 'react';

import { App } from './components';
/*
const App = () => (
  <div className="d-flex justify-content-center m-2 flex-row vh-100">
    <div className="flex-column ml-5 pr-2 border-right border-warning">
      Hello 1
    </div>
    <div className="flex-column mr-5 pl-2 w-50">
      <div className="overflow-auto pb-1 h-75">
        Hello 2
      </div>
      <div className="mt-2 border-top border-warning ">
        Hello 3
      </div>
    </div>
  </div>
);
*/

ReactDOM.render((
  <App />
), document.getElementById('app'));
