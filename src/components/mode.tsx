import React from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { id } from '../utils/utils';
import { AtomNames, Modes } from '../enums/enums';
import { store } from '../store/store';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function Mode() {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    store.status.mode = e.target.value as Modes;
  }

  return <>
    <FormControl>
      <RadioGroup aria-labelledby={id()} defaultValue={Modes.Atoms} name="group" onChange={onChange}>
        <FormControlLabel value={Modes.Atoms} control={<Radio />} label="Atoms" />
        <Typography variant="body2" sx={{ ml: 2 }}>Current atom: {AtomNames[store.status.atom]}</Typography>
        <br/>
        <Box style={{ color: 'grey' }} sx={{ ml: 2 }}>
          <Typography variant="body2">LMB + ctrl - change atom</Typography>
          <Typography variant="body2">LMB - add atom</Typography>
          <Typography variant="body2">RMB - remove atom</Typography>
        </Box>
        <FormControlLabel value={Modes.Bonds} control={<Radio />} label="Bonds" />
        <Box style={{ color: 'grey' }} sx={{ ml: 2 }}>
          <Typography variant="body2">LMB - change direction</Typography>
          <Typography variant="body2">RMB - change type</Typography>
        </Box>
      </RadioGroup>
    </FormControl>
  </>
}