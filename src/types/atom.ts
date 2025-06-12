import Config from "../config"

export enum AtomIndexes {
  no  = 0,
  mov = 1,
  fix = 2,
  spl = 3,
  con = 4,
  job = 5,
  rep = 6,
  mut = 7
}

export type Atom = {
  id: string,
  a: number,
  x: number,
  y: number
}

export const ATOM_NEW = {
  [AtomIndexes.no] : 0,
  [AtomIndexes.mov]: 0b0010000000000000,
  [AtomIndexes.fix]: 0b0100000000000000,
  [AtomIndexes.spl]: 0b0110000000000000,
  [AtomIndexes.con]: 0b1000000000000000,
  [AtomIndexes.job]: 0b1010000000000000,
  [AtomIndexes.rep]: 0b1100000000000000,
  [AtomIndexes.mut]: 0b1110000000000000
}

export const ATOM_COLORS = {
  [AtomIndexes.no] : '',
  [AtomIndexes.mov]: Config.atoms.movColor,
  [AtomIndexes.fix]: Config.atoms.fixColor,
  [AtomIndexes.spl]: Config.atoms.splColor,
  [AtomIndexes.con]: Config.atoms.conColor,
  [AtomIndexes.job]: Config.atoms.jobColor,
  [AtomIndexes.rep]: Config.atoms.repColor,
  [AtomIndexes.mut]: Config.atoms.mutColor
}

export const ATOM_TEXTS = {
  [AtomIndexes.no] : '',
  [AtomIndexes.mov]: 'm',
  [AtomIndexes.fix]: 'f',
  [AtomIndexes.spl]: 's',
  [AtomIndexes.con]: 'i',
  [AtomIndexes.job]: 'j',
  [AtomIndexes.rep]: 'r',
  [AtomIndexes.mut]: 'u'
}