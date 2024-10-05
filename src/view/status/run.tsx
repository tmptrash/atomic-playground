import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AdbRoundedIcon from '@mui/icons-material/AdbRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { sync } from "../../utils/irma5";
import { tick } from 'irma5/src/vms'
import { store } from "../../store/store";
//
// Virtual machines instance singleton. Will be updated
// after every synchronization with irma5
//
let vms

export default function Run() {
  function onDebug() {
    if (!store.sandbox.synced) {
      vms = sync(vms?.w)
      store.sandbox.synced = true
    }
    const vmIdx = store.sandbox.vmIdx
    vmIdx < vms.offs.i && (store.sandbox.vmIdx += tick(vms, vmIdx))
  }

  function onRun() {
    // empty fn
  }

  return <Box sx={{ m: 2 }}>
    <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Run & Debug</Typography>
    <Button variant="contained" startIcon={<AdbRoundedIcon />} sx={{mr: 6}} onClick={onDebug}>Step</Button>
    <Button variant="contained" startIcon={<PlayArrowRoundedIcon />} onClick={onRun}>Run</Button>
  </Box>
}