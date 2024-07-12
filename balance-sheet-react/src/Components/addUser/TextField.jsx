import React from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';

const TextfieldWrapper = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    margin: 'normal',
    size: 'small'
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <TextField
      sx={{
        "& .MuiInputBase-root": {
          height: 45
        }
      }}
      {...configTextfield}
    />
  );
};

export default TextfieldWrapper;
