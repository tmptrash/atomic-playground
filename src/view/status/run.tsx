import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AdbRoundedIcon from '@mui/icons-material/AdbRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { VMType, tick } from 'irma5/src/vms'
import { receive, send } from "./../../utils/irma5";
import { store } from "../../store/store";
import { ATOMS_SIGNAL, VMS_SIGNAL } from "../../store/signals";
//
// Virtual machines instance singleton. Will be updated
// after every synchronization with irma5
//
let irma5Vms: VMType

export default function Run() {
  function onStep() {
    //
    // if atoms or vms were changed we have to sync with irma5
    //
    !store.sandbox.synced && (irma5Vms = send(VMS_SIGNAL.value, ATOMS_SIGNAL.value, irma5Vms?.w))
    store.sandbox.synced = true
    //
    // runs one tick in irma5 for one VM
    //
    if (store.sandbox.vmIdx >= 0 && irma5Vms?.offs?.i > 0) {
      store.sandbox.vmIdx += tick(irma5Vms, store.sandbox.vmIdx);
      (store.sandbox.vmIdx >= irma5Vms.offs.i || store.sandbox.vmIdx < 0) && (store.sandbox.vmIdx = 0);
    }
    //
    // receives new atoms and vms from irma5 after tick()
    //
    [VMS_SIGNAL.value, ATOMS_SIGNAL.value] = receive(irma5Vms)
  }

  function onRun() {
    // empty fn
  }

  return <Box sx={{ m: 2 }}>
    <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Run & Debug</Typography>
    <Button variant="contained" startIcon={<AdbRoundedIcon />} sx={{mr: 6}} onClick={onStep}>Step</Button>
    <Button variant="contained" startIcon={<PlayArrowRoundedIcon />} onClick={onRun} disabled>Run</Button>
  </Box>
}