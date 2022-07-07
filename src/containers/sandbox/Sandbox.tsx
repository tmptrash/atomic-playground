import React from 'react';
import { useEffect } from "react";
import './Sandbox.scss';
import Grid from '../../classes/Grid';
import { GridCfg } from './../../classes/GridCfg';
import { EVENTS, on, off} from './../../utils/bus';
import { IAtom, IBlock, IJson, IVm } from '../../interfaces/json';

const CANVAS_QUERY = 'canvas';

export default function Sandbox(props: GridCfg) {
  let grid: Grid;

  function onUpload(json: IJson) {
    if (json.width !== grid.cfg.cols || json.height !== grid.cfg.rows) {
      console.error(`Invalid width/height of imported JSON. Required (w=${grid.cfg.cols}, h=${grid.cfg.rows}). Imported (w=${json.width}, h=${json.height})`);
      return;
    }

    json.blocks.forEach((b: IBlock) => {
      b.atoms.forEach((a: IAtom) => {
        console.log(a);
      });
      b.vms.forEach((v: IVm) => {
        console.log(v);
      });
    });
  }

  function onDestroy() {
    off(EVENTS.UPLOAD, onUpload);
    grid.destroy();
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    grid = new Grid({...props, query: '#' + CANVAS_QUERY});
    on(EVENTS.UPLOAD, onUpload);
    return onDestroy;
  });

  return <div id={CANVAS_QUERY} className="grid"/>
}

Sandbox.defaultProps = {
  rows: 10,
  cols: 10,
  query: '#canvas',
  stepSize: 40,
  scaleSpeed: .1,
  border: 4
}
