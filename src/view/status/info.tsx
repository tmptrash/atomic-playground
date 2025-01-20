import React from 'react'
import { Typography } from '@mui/material'
import { HOVERED_ATOM_SIGNAL } from '../../signals'
import { useSignals } from '@preact/signals-react/runtime'

export default function Info() {
  useSignals()

  return <Typography variant="body2" sx={{ ml: 2, mt: 3, mb: 2 }}>
    Atom: <span style={{ color: 'blue' }}>{HOVERED_ATOM_SIGNAL.value}</span>
  </Typography>
}