import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: '200px',
  },
}));


export default function ControlledOpenSelect({currentValue,id, setValue,setId, options}) {
 

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    console.log(event.target.value,"event.target.valueevent.target.value")
    setValue(event.target.value);
    setId(id)
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