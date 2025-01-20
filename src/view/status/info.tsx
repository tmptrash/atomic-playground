import React from 'react'
import { Typography } from '@mui/material'
import { store } from '../../store/store'
import { bind } from '../../store/binder'
import { HOVERED_ATOM_SIGNAL } from '../../store/signals'
import { useSignals } from '@preact/signals-react/runtime'

export default function Info() {
  bind(store.status.hovers)
  useSignals()

  return <Typography variant="body2" sx={{ ml: 2, mt: 3, mb: 2 }}>
    Atom: <span style={{ color: 'blue' }}>{HOVERED_ATOM_SIGNAL.value}</span>
  </Typography>
}