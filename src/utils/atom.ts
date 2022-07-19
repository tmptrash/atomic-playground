import { AtomTypes } from "../enums/enums";

const ATOM_TYPE_MASK  = 0b1110000000000000;
const ATOM_TYPE_SHIFT = 13;

export function getType(atom: number): AtomTypes {
  return (atom & ATOM_TYPE_MASK) >> ATOM_TYPE_SHIFT;
}