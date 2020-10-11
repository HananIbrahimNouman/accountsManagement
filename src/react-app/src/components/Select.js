import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: '150px',
  },
}));


export default function useSelect({currentValue,id, setValue,setId, options}) {
 

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (id) setId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={currentValue}
          onChange={handleChange}
        >
            {options.map((item) => {
                return (
                    <MenuItem value={item}>{item}</MenuItem>
                );
             })}
        </Select>
      </FormControl>
    </>
  );
}