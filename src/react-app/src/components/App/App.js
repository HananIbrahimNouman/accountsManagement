import React, {useEffect} from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Accounts from '../../pages/Accounts';

function App({fetchAccounts}) {

  useEffect(() => {
    fetchAccounts();
  }, [
    fetchAccounts
    ])

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/accounts' component={Accounts} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
