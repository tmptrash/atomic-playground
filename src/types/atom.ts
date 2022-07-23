import Config from "../config";
import { AtomTypes } from "../enums/enums";

export const ATOMS = {
  [AtomTypes.Mov]: 0b0010000000000000,
  [AtomTypes.Fix]: 0b0100000000000000,
  [AtomTypes.Spl]: 0b0110000000000000,
  [AtomTypes.If] : 0b1000000000000000,
  [AtomTypes.Job]: 0b1010000000000000
};

export const ATOM_COLORS = {
  [AtomTypes.Mov]: Config.atoms.movColor,
  [AtomTypes.Fix]: Config.atoms.fixColor,
  [AtomTypes.Spl]: Config.atoms.splColor,
  [AtomTypes.If] : Config.atoms.ifColor,
  [AtomTypes.Job]: Config.atoms.jobColor
}

export const ATOM_TEXTS = {
  [AtomTypes.Mov]: 'm',
  [AtomTypes.Fix]: 'f',
  [AtomTypes.Spl]: 's',
  [AtomTypes.If] : 'i',
  [AtomTypes.Job]: 'j'
};

export enum Dir {
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