import React from 'react';
import { useEffect } from "react";
import './Sandbox.scss';
import Grid from './Grid';
import { GridCfgDef } from './GridCfg';

const CANVAS_QUERY = 'canvas';

export default function Sandbox() {
  let grid: Grid;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    grid = new Grid({...GridCfgDef, query: '#' + CANVAS_QUERY});

    return () => grid.destroy()
  });

  return <div id={CANVAS_QUERY} className="grid"/>
}
