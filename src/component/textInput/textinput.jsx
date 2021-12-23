import React from 'react';
import TextField from '@mui/material/TextField';
const TextInput = ({errorText,...props})=>(
  <>
  <TextField helperText={errorText ? errorText : null} {...props} />
  </>
  );

export default TextInput;