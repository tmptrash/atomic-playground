import React from 'react';
import Box from '@mui/material/Box';
import Upload from '../../components/upload/Upload';
import './Status.scss';

export default function Status() {
  return (
    <div className="status">
      <Box sx={{ m: 1}}>
        <Upload/>
      </Box>
    </div>
  )
}