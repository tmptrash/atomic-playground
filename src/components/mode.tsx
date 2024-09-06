import React from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { id } from '../utils/utils';
import { Modes } from '../enums/enums';
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
        <Box style={{ color: 'grey' }} sx={{ ml: 2 }}>
          <Typography variant="body2" sx={{ display: 'block' }}>LMB - change atom</Typography>
          <Typography variant="body2" sx={{ display: 'block' }}>RMB - delete atom</Typography>
        </Box>
        <FormControlLabel value={Modes.Bonds} control={<Radio />} label="Bonds" />
        <Box style={{ color: 'grey' }} sx={{ ml: 2 }}>
          <Typography variant="body2" sx={{ display: 'block' }}>LMB - change direction</Typography>
          <Typography variant="body2" sx={{ display: 'block' }}>RMB - change type</Typography>
        </Box>
      </RadioGroup>
    </FormControl>
  </>
}