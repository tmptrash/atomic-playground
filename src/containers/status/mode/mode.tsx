import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { id } from '../../../utils/utils';
import { EVENTS, fire } from '../../../utils/bus';
import { Modes } from '../../../enums/enums';

export default function Mode() {
  const labelId = id();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    fire(EVENTS.MODE, e.target.value);
  }

  return (
    <FormControl>
      <FormLabel id={labelId}>Atoms edit mode</FormLabel>
      <RadioGroup row aria-labelledby={labelId} defaultValue={Modes.Edit} name="group" onChange={onChange}>
        <FormControlLabel value={Modes.Edit} control={<Radio />} label="Edit" />
        <FormControlLabel value={Modes.Clear} control={<Radio />} label="Clear" />
        <FormControlLabel value={Modes.Add} control={<Radio />} label="Add" />
      </RadioGroup>
    </FormControl>
  )
}