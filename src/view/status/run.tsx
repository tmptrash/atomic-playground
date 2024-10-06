import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AdbRoundedIcon from '@mui/icons-material/AdbRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { receive, send } from "../../utils/irma5";
import { tick } from 'irma5/src/vms'
import { store } from "../../store/store";
import { toXY } from "../../utils";
//
// Virtual machines instance singleton. Will be updated
// after every synchronization with irma5
//
let irma5Vms

export default function Run() {
  const [x, y] = toXY(store.sandbox.vms?.[store.sandbox.vmIdx]?.offs)

  function onDebug() {
    //
    // if atoms or vms were changed we have to sync with irma5
    //
    !store.sandbox.synced && (irma5Vms = send(store.sandbox.vms, store.sandbox.atoms, irma5Vms?.w))
    store.sandbox.synced = true
    //
    // runs one tick in irma5 for one VM
    //
    if (store.sandbox.vmIdx >= 0) {
      store.sandbox.vmIdx += tick(irma5Vms, store.sandbox.vmIdx)
      store.sandbox.vmIdx > irma5Vms.offs.i && (store.sandbox.vmIdx = 0);
    }
    //
    // receives new atoms and vms from irma5 after tick()
    //
    [store.sandbox.vms, store.sandbox.atoms] = receive(irma5Vms)
  }

  function onRun() {
    // empty fn
  }

  return <Box sx={{ m: 2 }}>
    <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Run & Debug</Typography>
    <Typography variant="body2" style={{ color: 'grey' }} sx={{ ml: 4, mb: 2 }}>
      Current VM: (<span style={{ color: 'blue' }}>{x}</span>, <span style={{ color: 'blue' }}>{y}</span>)
    </Typography>
    <Button variant="contained" startIcon={<AdbRoundedIcon />} sx={{mr: 6}} onClick={onDebug}>Step</Button>
    <Button variant="contained" startIcon={<PlayArrowRoundedIcon />} onClick={onRun}>Run</Button>
  </Box>
}