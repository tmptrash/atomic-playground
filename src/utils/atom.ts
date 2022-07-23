import { AtomTypes } from "../enums/enums";
import { ATOMS } from "../types/atom";

const ATOM_TYPE_MASK  = 0b1110000000000000;
const ATOM_TYPE_SHIFT = 13;

export function getType(atom: number): AtomTypes {
  return (atom & ATOM_TYPE_MASK) >> ATOM_TYPE_SHIFT;
}

export function nextDef(type: AtomTypes): number {
  if (++type > AtomTypes.Job) { type = AtomTypes.Mov }
  return ATOMS[type];
}