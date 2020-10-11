import React from 'react';
import { makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    statsContainer: {
        display:'flex',
        justifyContent: 'space-around'
    },
}));

function Stats({stats}) {
  const classes = useStyles();
  const {totalBalance,pending, funded,closed,approved} = stats;

  return (
    < div className={classes.statsContainer} >
        <span ><h5>Total Balance</h5>{totalBalance}</span>
        <span ><h5>Pending Accounts</h5> {pending}</span>
        <span ><h5>Funded Accounts</h5> {funded}</span>
        <span ><h5>Closed Accounts</h5> {closed}</span>
        <span ><h5>Approved Accounts</h5> {approved}</span>
    </div>
  );
}

export default Stats;
