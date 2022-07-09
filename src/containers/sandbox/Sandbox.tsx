import React from 'react';
import { useEffect } from "react";
import './Sandbox.scss';
import Grid from '../../classes/Grid';
import { EVENTS, on, off} from './../../utils/bus';
import { IAtom, IBlock, IJson, IVm } from '../../interfaces/json';
import Atom from '../../classes/Atom';
import { AtomTypes, Modes } from '../../enums/enums';
import Config from '../../config';
import Store from '../../store';

export default function Sandbox() {
  let grid: Grid;
  const atoms: {[name: string]: Atom} = {};

  function onAfterRender() {
    for(const a in atoms) {
      // eslint-disable-next-line no-prototype-builtins
      if (atoms.hasOwnProperty(a)) {
        atoms[a].draw();
      }
    }
  }

  function onUpload(json: IJson) {
    if (json.width !== Config.grid.cols || json.height !== Config.grid.rows) {
      console.error(`Invalid width/height of imported JSON. Required (w=${Config.grid.cols}, h=${Config.grid.rows}). Imported (w=${json.width}, h=${json.height})`);
      return;
    }

    const stepSize = Config.grid.stepSize;
    json.blocks.forEach((b: IBlock) => {
      b.atoms.forEach((a: IAtom) => {
        // TODO: atom type
        const atom = new Atom(grid.layer, a.x * stepSize, a.y * stepSize, stepSize, AtomTypes.Mov);
        atoms[`${a.x}-${a.y}`] = atom;
        atom.draw();
      });
      b.vms.forEach((v: IVm) => {
        console.log(v);
      });
    });
  }

  function onMode(mode: Modes) {
    Store.mode = mode;
  }

  function onDestroy() {
    off(EVENTS.UPLOAD, onUpload);
    grid.destroy();
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    grid = new Grid(onAfterRender);
    on(EVENTS.UPLOAD, onUpload);
    on(EVENTS.MODE, onMode);
    return onDestroy;
  });

  return <div id={Config.grid.query} className="grid"/>
}
