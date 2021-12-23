
import React from 'react';
import Button from '@mui/material/Button';

const UiButton =({buttontext,...props})=>(
    <>
    <Button  {...props} >{buttontext}</Button>
    </>
  );
export default UiButton;
