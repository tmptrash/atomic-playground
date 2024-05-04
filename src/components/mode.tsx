import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
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
  // length/2 because Object.entries() returns 2 times bigger array
  const atoms = entries.slice(0, entries.length / 2);
  const [atom, setAtom] = useState(atoms[0]);
  const [mode, setMode] = useState(store.status.mode);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    store.status.mode = e.target.value as Modes;
    setMode(store.status.mode);
  }

  function onAtom(event: SelectChangeEvent) {
    const index = event.target.value;
    setAtom([index, atoms[+index - 1][1]]);
    store.status.atom = +index as AtomTypes;
  }

  return (
    <>
      <FormControl>
        <FormLabel id={modeLabelId}>
          Atoms edit mode
          <Tooltip title={<h3>Use left and right mouse buttons to achive different functions</h3>} placement="top-start">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </FormLabel>
        <RadioGroup row aria-labelledby={modeLabelId} defaultValue={Modes.Add} name="group" onChange={onChange}>
          <FormControlLabel value={Modes.Add} control={<Radio />} label="Add/Del" />
          <FormControlLabel value={Modes.Edit} control={<Radio />} label="Bond/Type" />
        </RadioGroup>
      </FormControl>
      {
        // dropdown with atom types
        mode === Modes.Add ? <FormControl fullWidth sx={{mt: 2}}>
          <InputLabel id={atomLabelId}>Atom</InputLabel>
          <Select labelId={atomLabelId} id="demo-simple-select" value={atom[0]} label="Atom" onChange={onAtom}>
            {atoms.map(a => <MenuItem key={a[1]} value={a[0]}>{a[1]}</MenuItem>)}
          </Select>
        </FormControl> : null
      }
    </>
  )
}