import React, { useState, useEffect } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList'; 
import { Paper,makeStyles, TextField, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';

import useTable from "../../components/useTable";
import Select from "../../components/Select";

const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: '100px auto auto auto',
      padding: theme.spacing(3),
      width:'75%',
  },
  searchInput: {
      width: '75%'
  }
}))

const Accounts = ({
  accounts,
  updateAccount
}) => {

  console.log(accounts,"accountssssss")
  const classes = useStyles();
  const [filteredRecords, setFilteredRecords] = useState(accounts)
  const [value, setValue] = React.useState('');
  const [id, setId] = React.useState('');
  const length = accounts.length;

  const {
        TblContainer,
        TblPagination,
        recordsAfterPaging
    } = useTable(filteredRecords, ['id', 'balance', 'status'], length);

  const handleSearch = e => {
    let target = e.target;
    setFilteredRecords(filteredRecords.filter(x => x.status.includes(target.value))) 
  }
  

  useEffect(() => {
    if(value) updateAccount({id,status:value})
  }, [value]);

  useEffect(() => {
    setFilteredRecords(accounts)
  }, [accounts]);


  return (
    <>
      <Paper className={classes.pageContent} >
        <Toolbar>
        <TextField
            className={classes.searchInput}
            variant="outlined"
            label="Filter By Status"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (<InputAdornment position="start">
                  <FilterListIcon />
              </InputAdornment>)
          }}
        />
        </Toolbar>
        <TblContainer>
            <TableBody>
                {
                  
                  recordsAfterPaging().map(item =>{
                    let options = [];
                    if(item.status !== 'closed' && !(item.status == 'funded' && item.balance == 0 )) options.push('closed');
                    if(item.status == 'approved') options.push('funded');
                    if(item.status == 'pending') options.push('approved');
                    options.push(item.status)

                    return (
                      <TableRow key={item._id}>
                        <TableCell>{item._id}</TableCell>
                        <TableCell>{item.balance}</TableCell>
                        <TableCell><Select currentValue={item.status} id={item._id} setValue={setValue} setId={setId} options={options}/></TableCell>
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
