import React from 'react'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { id } from '../../utils'
import { AtomIndexes, EditModes, BOND_TYPES } from '../../types'
import { store } from '../../store/store'

export default function Edit() {
  const bond = BOND_TYPES[store.status.curAtom]?.[store.status.bondIdx]?.[2]

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    store.status.mode = e.target.value as EditModes
  }

  return <Box sx={{ m: 2 }}>
    <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Edit atoms and bones</Typography>
    <FormControl>
      <RadioGroup aria-labelledby={id()} defaultValue={EditModes.Atom} name="group" onChange={onChange}>
        <FormControlLabel value={EditModes.Atom} control={<Radio />} label="Atoms" />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Current atom: <span style={{ color: 'blue' }}>{AtomIndexes[store.status.atom]}</span>
        </Typography>
        <br/>
        <Box style={{ color: 'grey' }} sx={{ ml: 2 }}>
          <Typography variant="body2">LMB + ctrl - change atom</Typography>
          <Typography variant="body2">LMB - add atom</Typography>
          <Typography variant="body2">RMB - remove atom</Typography>
        </Box>

        <FormControlLabel value={EditModes.Bond} control={<Radio />} label="Bonds" />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Current bond: <span style={{ color: 'blue' }}>{bond}</span>
        </Typography>
        <br/>
        <Box style={{ color: 'grey' }} sx={{ ml: 2 }}>
          <Typography variant="body2">LMB - change direction</Typography>
          <Typography variant="body2">RMB - change type</Typography>
        </Box>

        <FormControlLabel value={EditModes.VM} control={<Radio />} label="VMs" />
        <Box style={{ color: 'grey' }} sx={{ ml: 2 }}>
          <Typography variant="body2">LMB - add VM</Typography>
          <Typography variant="body2">RMB - remove VM</Typography>
        </Box>
      </RadioGroup>
    </FormControl>
  </Box>
}