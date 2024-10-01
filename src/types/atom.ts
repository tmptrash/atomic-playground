import Config from "../config"

export enum AtomTypes {
  no  = 0,
  mov = 1,
  fix = 2,
  spl = 3,
  con = 4,
  job = 5,
  rep = 6
}

export enum EditModes {
  Atoms = 'atoms',
  Bonds = 'bonds'
}

export const ATOMS = {
  [AtomTypes.mov]: 0b0010000000000000,
  [AtomTypes.fix]: 0b0100000000000000,
  [AtomTypes.spl]: 0b0110000000000000,
  [AtomTypes.con]: 0b1000000000000000,
  [AtomTypes.job]: 0b1010000000000000,
  [AtomTypes.rep]: 0b1100000000000000
}

// TODO: do we need this? can we use config directly?
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
}

export enum Dir {
  no = -1,
  up = 0,
  upRight = 1,
  right = 2,
  rightDown = 3,
  down = 4,
  downLeft = 5,
  left = 6,
  leftUp = 7
}

export type Atom = {
  id: string,
  a: number,
  x: number,
  y: number
}