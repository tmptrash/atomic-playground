import React, { ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import { Input } from './styled';
import { EVENTS, fire } from './../../utils/bus';

export default function Upload() {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.length) { return }
    const reader = new FileReader();
    reader.onload = onLoad(event);
    reader.readAsText(event.target.files[0]);
  }

  function onLoad(event: ChangeEvent<HTMLInputElement>) {
    return (e: ProgressEvent<FileReader>) => {
      if (e?.target?.result) {
        try {
          fire(EVENTS.UPLOAD, JSON.parse(e.target.result.toString()));
        } catch(e) {
          console.error(`Invalid json file ${event?.target?.files?.[0]}`);
        }
      }
    }
  }

  return (
    <label htmlFor="upload-file">
      <Input accept="application/JSON" id="upload-file" type="file" onChange={onChange}/>
      <Button variant="contained" component="span">
        Upload
      </Button>
    </label>
  )
}