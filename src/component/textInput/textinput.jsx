import React from 'react';
import TextField from '@mui/material/TextField';
const TextInput = ({errorText,...props})=>(
  <>
  <TextField data-testid="textinputTextId" helperText={errorText ? errorText : null} {...props} />
  </>
  );

export default TextInput;