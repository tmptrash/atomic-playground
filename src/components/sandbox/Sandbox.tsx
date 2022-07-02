import React from 'react';
import { useEffect } from "react";
import './Sandbox.scss';
import Grid from './Grid';
import { GridCfgDef } from './GridCfg';

const CANVAS_QUERY = 'canvas';

export default function Sandbox() {
  let grid: Grid;

  useEffect(() => {
    grid = new Grid({...GridCfgDef, query: '#' + CANVAS_QUERY});
  });

  return <div id={CANVAS_QUERY} className="grid"/>
}
