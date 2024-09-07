import Config from "../config";
import { AtomTypes } from "../enums/enums";

export const ATOMS = {
  [AtomTypes.mov]: 0b0010000000000000,
  [AtomTypes.fix]: 0b0100000000000000,
  [AtomTypes.spl]: 0b0110000000000000,
  [AtomTypes.con]: 0b1000000000000000,
  [AtomTypes.job]: 0b1010000000000000,
  [AtomTypes.rep]: 0b1100000000000000
};

export const ATOM_COLORS = {
  [AtomTypes.mov]: Config.atoms.movColor,
  [AtomTypes.fix]: Config.atoms.fixColor,
  [AtomTypes.spl]: Config.atoms.splColor,
  [AtomTypes.con]: Config.atoms.ifColor,
  [AtomTypes.job]: Config.atoms.jobColor,
  [AtomTypes.rep]: Config.atoms.repColor
}

export const ATOM_TEXTS = {
  [AtomTypes.mov]: 'm',
  [AtomTypes.fix]: 'f',
  [AtomTypes.spl]: 's',
  [AtomTypes.con]: 'i',
  [AtomTypes.job]: 'j',
  [AtomTypes.rep]: 'r'
};

export enum Dir {
  no = 8,
  leftUp = 0,
  up = 1,
  upRight = 2,
  right = 3,
  rightDown = 4,
  down = 5,
  downLeft = 6,
  left = 7
}

export type Atom = {
  id: string,
  a: number,
  x: number,
  y: number
}