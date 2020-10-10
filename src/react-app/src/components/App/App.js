import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

import Home from '../../pages/Home';
import Accounts from '../../pages/Accounts';
import Drawer from '../Drawer/Drawer';


const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

function App({fetchAccounts}) {
  const classes = useStyles();

  useEffect(() => {
    fetchAccounts();
  }, [
    fetchAccounts
    ])

  return (
    <>
      <Router>
        <div className={classes.container}>
          <Drawer />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/accounts' component={Accounts} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
