import React from 'react';
import Box from '@mui/material/Box';
import Upload from '../../components/upload/uploadd';
import './status.scss';
import Mode from './mode/modee';

export default function Status() {
  console.log('Status rendering...');

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