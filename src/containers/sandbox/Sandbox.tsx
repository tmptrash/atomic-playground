import React from 'react';
import { useEffect } from "react";
import './Sandbox.scss';
import Grid from '../../classes/Grid';
import { GridCfg } from './../../classes/GridCfg';
import { EVENTS, on, off} from './../../utils/bus';
import { IAtom, IBlock, IJson, IVm } from '../../interfaces/json';
import Atom from '../../classes/Atom';
import { AtomType } from '../../enums/enums';

const CANVAS_QUERY = 'canvas';
const STEP_SIZE = 40;

export default function Sandbox(props: GridCfg) {
  let grid: Grid;
  const atoms: {[name: string]: Atom} = {};

  function onAfterRender() {
    for(const a in atoms) { atoms[a].draw() }
  }

  function onUpload(json: IJson) {
    if (json.width !== grid.cfg.cols || json.height !== grid.cfg.rows) {
      console.error(`Invalid width/height of imported JSON. Required (w=${grid.cfg.cols}, h=${grid.cfg.rows}). Imported (w=${json.width}, h=${json.height})`);
      return;
    }

    json.blocks.forEach((b: IBlock) => {
      b.atoms.forEach((a: IAtom) => {
        // TODO: atom type
        const atom = new Atom(grid.layer, a.x * STEP_SIZE, a.y * STEP_SIZE, STEP_SIZE, AtomType.MOV);
        atoms[`${a.x}-${a.y}`] = atom;
        atom.draw();
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
    grid = new Grid({...props, query: '#' + CANVAS_QUERY}, onAfterRender);
    on(EVENTS.UPLOAD, onUpload);
    return onDestroy;
  });

  return <div id={CANVAS_QUERY} className="grid"/>
}

Sandbox.defaultProps = {
  rows: 10,
  cols: 10,
  query: '#canvas',
  stepSize: STEP_SIZE,
  scaleSpeed: .1,
  border: 4
}
