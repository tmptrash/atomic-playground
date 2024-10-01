import React from 'react'
import Box from '@mui/material/Box'
import Upload from './upload/upload'
import Mode from '../mode'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { bind } from '../../store/binder'
import { store } from '../../store/store'

export default function Status() {
  bind(store.status)
  
  return (
    <div className="w-60 bg-gray-100">
      <Box sx={{ m: 2 }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Upload atoms from JSON</Typography>
        <Upload/>
      </Box>
      <Divider/>
      <Box sx={{ m: 2 }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Edit atoms and bones</Typography>
        <Mode/>
      </Box>
      <Divider/>
    </div>
  )
}