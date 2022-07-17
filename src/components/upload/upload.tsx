import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { Input } from './styled';
import { store } from '../../store/store';

export default function Upload() {
  const [file, setFile] = useState('');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event?.target?.files?.length) { return }
    const reader = new FileReader();
    reader.onload = onLoad(event);
    reader.readAsText(event.target.files[0]);
  }

  function onLoad(event: ChangeEvent<HTMLInputElement>) {
    return (e: ProgressEvent<FileReader>) => {
      if (e?.target?.result) {
        try {
          store.sandbox.atoms = JSON.parse(e.target.result.toString());
          setFile('');
        } catch(e) {
          console.error(`Invalid json file ${event?.target?.files?.[0]}`);
        }
      }
    }
  }

  return (
    <label htmlFor="upload-file">
      <Input accept="application/JSON" id="upload-file" type="file" onChange={onChange} value={file}/>
      <Button variant="contained" component="span">
        Upload
      </Button>
    </label>
  )
}