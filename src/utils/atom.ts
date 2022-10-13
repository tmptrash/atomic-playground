import { AtomTypes } from "../enums/enums";
import { store } from "../store/store";
import { Atom, ATOMS, Dir } from "../types/atom";

const DIR_OFFS = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

const ATOM_TYPE_MASK       = 0b1110000000000000;
const ATOM_TYPE_SHIFT      = 13;
const ATOM_HAS_VM_DIR_MASK = 0b0000001000000000;
const ATOM_VM_DIR_MASK     = 0b0001110000000000;
const ATOM_VM_DIR_SHIFT    = 10;
const ATOM_MOV_DIR_MASK    = 0b0000000111000000;
const ATOM_MOV_DIR_SHIFT   = 6;
const ATOM_BOND1_DIR_MASK  = 0b0000000111000000;
const ATOM_BOND1_DIR_SHIFT = 6;
const ATOM_BOND2_DIR_MASK  = 0b0000000000111000;
const ATOM_BOND2_DIR_SHIFT = 3;

export function getType(atom: number): AtomTypes {
  return (atom & ATOM_TYPE_MASK) >> ATOM_TYPE_SHIFT;
}

export function nextAtom(type: AtomTypes): number {
  if (++type > AtomTypes.Job) { type = AtomTypes.Mov }
  return ATOMS[type];
}

export function getVmDir(atom: number): Dir {
  if (!(atom & ATOM_HAS_VM_DIR_MASK)) { return Dir.no }
  return (atom & ATOM_VM_DIR_MASK) >> ATOM_VM_DIR_SHIFT;
}

export function getMovDir(atom: number): Dir {
  return (atom & ATOM_MOV_DIR_MASK) >> ATOM_MOV_DIR_SHIFT;
}

export function getBond1Dir(atom: number): Dir {
  return (atom & ATOM_BOND1_DIR_MASK) >> ATOM_BOND1_DIR_SHIFT;
}

export function getBond2Dir(atom: number): Dir {
  return (atom & ATOM_BOND2_DIR_MASK) >> ATOM_BOND2_DIR_SHIFT;
}

export function getXYByDir(a: Atom, dir: Dir): [number, number] {
  const offs = DIR_OFFS[dir];
  return [a.x + offs[0], a.y + offs[1]];
}

export function findAtomIdx(atomX: number, atomY: number): number {
  return store.sandbox.atoms.findIndex(a => a.x === atomX && a.y === atomY);
}