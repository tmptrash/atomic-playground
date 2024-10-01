import React, { ChangeEvent, useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { store } from '../../store/store'
import { toAtoms } from '../../utils/json'

export default function Upload() {
  const [file, setFile] = useState('')

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event?.target?.files?.length) { return }
    const reader = new FileReader()
    reader.onload = onLoad(event)
    reader.readAsText(event.target.files[0])
  }

  function onLoad(event: ChangeEvent<HTMLInputElement>) {
    return (e: ProgressEvent<FileReader>) => {
      if (e?.target?.result) {
        try {
          store.sandbox.atoms = toAtoms(JSON.parse(e.target.result.toString()))
          setFile('')
        } catch(e) {
          console.error(`Invalid json file ${event?.target?.files?.[0]}`)
        }
      }
    }
  }

  return <Box sx={{ m: 2 }}>
    <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Upload atoms from JSON</Typography>
    <label htmlFor="upload-file">
      <input accept="application/JSON" id="upload-file" type="file" onChange={onChange} value={file} className="hidden"/>
      <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
        Upload
      </Button>
    </label>
  </Box>
}