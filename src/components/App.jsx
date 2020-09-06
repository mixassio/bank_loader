import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Banks from './Banks.jsx';
import Contragents from './Contragents.jsx';


const Home = () => (
  <div>
    <h1>Welcome to helper</h1>
  </div>
);

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/banks">Banks loader</Link></li>
          <li><Link to="/contragents">contragents</Link></li>
        </ul>
        <hr />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/banks' component={Banks}/>
          <Route path='/contragents' component={Contragents}/>
        </Switch>
      </div>
    </Router>
  );
}
