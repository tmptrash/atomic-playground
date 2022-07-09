import React from 'react';
import Box from '@mui/material/Box';
import Upload from '../../components/upload/Upload';
import './Status.scss';
import Mode from './mode/mode';

export default function Status() {
  return (
    <div className="status">
      <Box sx={{ m: 1 }}>
        <Upload/>
      </Box>
      <Box sx={{ m: 1, mt: 3 }}>
        <Mode/>
      </Box>
    </div>
  )
}