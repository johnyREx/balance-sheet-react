import React from 'react';
import { MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';

const SelectWrapper = ({
  name,
  options,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
    console.log("selecteddd" , value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    margin: "normal"
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField
      sx={{
        "& .MuiInputBase-root": {
          height: 45
        }
      }}
      {...configSelect}
      size='small'
    >
      {Object.keys(options).map((item, pos) => (
        <MenuItem key={pos} value={item}>
          {options[item]}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectWrapper;
