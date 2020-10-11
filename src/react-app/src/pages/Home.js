import React from 'react';
import { makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  home: {
    width:'500px',
    margin: 'auto',
    textAlign: 'center',
    padding: '15%',
}  ,
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <h1 className={classes.welcomeMsg}>Clients Accounts Dashboard</h1>
    </div>
  );
}

export default Home;
