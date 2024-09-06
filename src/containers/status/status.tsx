import React from 'react'
import Box from '@mui/material/Box'
import Upload from '../../components/upload/upload'
import './status.scss'
import Mode from '../../components/mode'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

export default function Status() {
  return (
    <div className="status">
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