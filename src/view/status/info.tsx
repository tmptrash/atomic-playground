import React from 'react'
import { Typography } from '@mui/material'
import { store } from '../../store/store'
import { bind } from '../../store/binder'

export default function Info() {
  bind(store.status.hovers)

  return <Typography variant="body2" sx={{ ml: 2, mt: 3, mb: 2 }}>
    Atom: <span style={{ color: 'blue' }}>{store.status.hovers.atom}</span>
  </Typography>
}