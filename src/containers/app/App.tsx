import React from 'react';
import Grid from '../../components/grid/Grid';
import Status from '../../components/status/Status';
import './App.scss';

export default function App() {
  return (
    <>
      <Grid rows={10} cols={10}/>
      <Status/>
    </>
  )
}