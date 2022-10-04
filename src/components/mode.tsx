import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { id } from '../utils/utils';
import { AtomTypes, Modes } from '../enums/enums';
import { store } from '../store/store';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Mode() {
  const modeLabelId = id();
  const atomLabelId = id();
  const entries = Object.entries(AtomTypes);
  const atoms = entries.slice(0, entries.length / 2);
  const [atom, setAtom] = useState(atoms[0]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    store.status.mode = e.target.value as Modes;
  }

  function onAtom(event: SelectChangeEvent) {
    const index = event.target.value;
    setAtom([index, atoms[Number(index)][1]]);
  }

  return (
    <>
      <FormControl>
        <FormLabel id={modeLabelId}>Atoms edit mode</FormLabel>
        <RadioGroup row aria-labelledby={modeLabelId} defaultValue={Modes.Edit} name="group" onChange={onChange}>
          <FormControlLabel value={Modes.Edit} control={<Radio />} label="Edit" />
          <FormControlLabel value={Modes.Clear} control={<Radio />} label="Clear" />
          <FormControlLabel value={Modes.Add} control={<Radio />} label="Add" />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth sx={{mt: 2}}>
        <InputLabel id={atomLabelId}>Atom</InputLabel>
        <Select labelId={atomLabelId} id="demo-simple-select" value={atom[0]} label="Atom" onChange={onAtom}>
          {atoms.map(a => <MenuItem key={a[1]} value={a[0]}>{a[1]}</MenuItem>)}
        </Select>
      </FormControl>
    </>
  )
}