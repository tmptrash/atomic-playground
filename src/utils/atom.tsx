import React from 'react';
import { Line } from "react-konva";
import Config from '../config';
import { AtomTypes } from "../enums/enums";
import { Atom, ATOMS, Dir } from "../types/atom";

const ATOM_TYPE_MASK  = 0b1110000000000000;
const ATOM_TYPE_SHIFT = 13;

export function getType(atom: number): AtomTypes {
  return (atom & ATOM_TYPE_MASK) >> ATOM_TYPE_SHIFT;
}

export function nextDef(type: AtomTypes): number {
  if (++type > AtomTypes.Job) { type = AtomTypes.Mov }
  return ATOMS[type];
}

export function getLine(a: Atom, dir: Dir): React.ReactNode {
  const halfStep = Config.grid.stepSize / 2;
  
  return (
    <Line
      points={[a.x - halfStep, a.y - halfStep, a.x, a.y]}
      stroke={Config.atoms.nextColor}
      strokeWidth={1}
    />)
}