import React from 'react'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import { Box, Stack, TextField } from '@mui/material'
import { id } from '../../utils'
import { AtomIndexes, EditModes, BOND_TYPES } from '../../types'
import { store } from '../../store/store'
import { ADD_ATOM_SIGNAL, CUR_ATOM_SIGNAL, MODE_SIGNAL } from '../../store/signals'

export default function Edit() {
  const bond = BOND_TYPES[CUR_ATOM_SIGNAL.value]?.[store.status.bondIdx]?.[2]
  const inputStyle = {"& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" }, "& input[type=number]": { MozAppearance: "textfield"}}

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    MODE_SIGNAL.value = e.target.value as EditModes
  }

  return <Box sx={{ m: 2 }}>
    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>Edit atoms, bones & VMs</Typography>
    <FormControl>
      <RadioGroup aria-labelledby={id()} defaultValue={EditModes.Atom} name="group" onChange={onChange}>
        <FormControlLabel value={EditModes.Atom} control={<Radio />} label={<span style={{ fontWeight: 500 }}>Atoms</span>}/>
        <Box style={{ color: 'grey' }} sx={{ ml: 4, mt: -1 }}>
          <Typography variant="body2">LMB + ctrl - change atom</Typography>
          <Typography variant="body2">LMB - add atom</Typography>
          <Typography variant="body2">RMB - remove atom</Typography>
        </Box>
        <Typography variant="body2" sx={{ ml: 4, mt: .3, mb: 2 }}>
          Atom to add: <span style={{ color: 'blue' }}>{AtomIndexes[ADD_ATOM_SIGNAL.value]}</span>
        </Typography>

        <FormControlLabel value={EditModes.Bond} control={<Radio />} label={<span style={{ fontWeight: 500 }}>Bonds</span>} />
        <Box style={{ color: 'grey' }} sx={{ ml: 4, mt: -1 }}>
          <Typography variant="body2">LMB - change direction</Typography>
          <Typography variant="body2">RMB - change type</Typography>
        </Box>
        <Typography variant="body2" sx={{ ml: 4, mt: .3, mb: 2 }}>
          Current bond: <span style={{ color: 'blue' }}>{bond}</span>
        </Typography>

        <FormControlLabel value={EditModes.VM} control={<Radio />} label={<span style={{ fontWeight: 500 }}>VMs</span>} />
        <Box style={{ color: 'grey' }} sx={{ ml: 4, mt: -1 }}>
          <Stack direction='row' spacing={2}>
            <Stack direction='column'>
              <Typography variant="body2">LMB - add VM</Typography>
              <Typography variant="body2">RMB - remove VM</Typography>
            </Stack>
            <TextField
              value={store.status.energy}
              onChange={e => store.status.energy = +e.target.value}
              style={{width: 83}}
              sx={inputStyle}
              size='small'
              type='number'
            />
          </Stack>
        </Box>
      </RadioGroup>
    </FormControl>
  </Box>
}