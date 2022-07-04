import React from 'react';
import { useEffect } from "react";
import './Sandbox.scss';
import Grid from './Grid';
import { GridCfgDef } from './GridCfg';
import { EVENTS, on, off} from './../../utils/bus';
import { IJson } from '../../interfaces/json';

const CANVAS_QUERY = 'canvas';

export default function Sandbox() {
  let grid: Grid;

  function onUpload(json: IJson) {
    // TODO: load atoms here
    console.log(json);
  }

  function onDestroy() {
    off(EVENTS.UPLOAD, onUpload);
    grid.destroy();
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    grid = new Grid({...GridCfgDef, query: '#' + CANVAS_QUERY});
    on(EVENTS.UPLOAD, onUpload);
    return onDestroy;
  });

  return <div id={CANVAS_QUERY} className="grid"/>
}
