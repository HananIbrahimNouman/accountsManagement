import React, { useState, useEffect } from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';

import Table from "../../components/Table";
import Select from "../../components/Select";
import Stats from "./components/index.js";

const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: '100px auto auto auto',
      padding: theme.spacing(3),
      width:'50%',
  },
  searchSelect: {
      marginLeft: 'auto'
  },
  filterLabel: {
    marginRight:'10px',
  },
  ToolFilter: {
    padding: '0 0 0 60%',
  }
}))

const Accounts = ({
  accounts,
  updateAccount,
  setStats
}) => {

  const classes = useStyles();

  //Those are local states, they wont need to be shared among other components.
  const [filteredRecords, setFilteredRecords] = useState(accounts)
  const [accountStatusValue, setAccountStatusValue] = React.useState(''); //used to change an account status
  const [id, setId] = React.useState('');
  const [searchedValue, setSearchedValue] = React.useState('ALL');

  const {
        TblContainer,
        TblPagination,
        recordsAfterPaging
    } = Table(filteredRecords, ['id', 'balance', 'status'], accounts.length);

  const handleSearch = selectedStatus => {
    setSearchedValue(selectedStatus);
    if(selectedStatus == 'ALL') return setFilteredRecords(accounts);  
    setFilteredRecords(accounts.filter(x => x.status.includes(selectedStatus))) 
  }

  const fillAccountStatusSelectOptions = item => {
    let options = [];
    if(item.status !== 'closed' && !(item.status == 'funded' && item.balance !== 0 )) options.push('closed');
    if(item.status == 'approved') options.push('funded');
    if(item.status == 'pending') options.push('approved');
    options.push(item.status)
    return options;
  }

  useEffect(() => {
    if(accountStatusValue) updateAccount({id,status:accountStatusValue})
  }, [accountStatusValue]);

  useEffect(() => {
    setFilteredRecords(accounts)
  }, [accounts]); //for refresh purpose and when accounts change


  return (
    <>
      <Paper className={classes.pageContent} >
        <Stats/>
        <Toolbar className={classes.ToolFilter}>
          <p className={classes.filterLabel}>Filter By Status</p>
          <Select currentValue={searchedValue}  setValue={handleSearch}  options={['ALL','pending','approved','funded','closed']}/>
        </Toolbar>
        <TblContainer>
            <TableBody>
                {
                  
                  recordsAfterPaging().map(item =>{
                    let options = fillAccountStatusSelectOptions(item);
                    return (
                      <TableRow key={item._id}>
                        <TableCell>{item._id}</TableCell>
                        <TableCell>{item.balance}</TableCell>
                        <TableCell><Select currentValue={item.status} id={item._id} setValue={setAccountStatusValue} setId={setId} options={options}/></TableCell>
                    </TableRow>
                    )
                  })
                }
            </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
};

export default Accounts;
