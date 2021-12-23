import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({label,value="20",onChange,size="default"}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={onChange}
          size={size}
        >
          <MenuItem value={'Health'}>Health</MenuItem>
          <MenuItem value={'Educational'}>Educational</MenuItem>
          <MenuItem value={'Food'}>Food</MenuItem>
          <MenuItem value={'Entertianment'}>Entertianment</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
