import { Atom, Dir } from './atom'

export type LinePoints = [number, number, number, number]
// TODO: remove these types
export type Bonds = [number, number, number, number, number, number, number, number]
export type BondData = {
  type: 'Arrow' | 'Sceptre'
  dir: Dir,
  color: string
}
// TODO: remove it
export type BondsState = {
  atom: Atom,
  bonds: Bonds,
  curBonds: Bonds,
  bondDatas: BondData[][]
}
// Offsets for only one bond
export const BONDS_OFFS = {
  [Dir.no]       : [ 0,  0,   0,    0,   0,   0,   0,   0],
  [Dir.leftUp]   : [.2, .2,   0,    0,  .1,   0,   0,  .1],
  [Dir.up]       : [.5, .2,  .5,  -.2,  .1,   0, -.1,   0],
  [Dir.upRight]  : [.8, .2, 1.2,  -.2,   0,  .1, -.1,   0],
  [Dir.right]    : [.8, .5, 1.2,   .5,   0,  .1,   0, -.1],
  [Dir.rightDown]: [.8, .8, 1.2,  1.2,   0, -.1, -.1,   0],
  [Dir.down]     : [.5, .8,  .5,  1.2, -.1,   0,  .1,   0],
  [Dir.downLeft] : [.2, .8, -.2,  1.2, -.1,   0,   0, -.1],
  [Dir.left]     : [.2, .5, -.2,   .5,   0, -.1,   0,  .1]
}
// TODO: i'm here!
export const BOND_TYPES = [
  [], // no atom
  [b1Dir], // mov 
]
//
// Describes direction of the next arrow within one direction.
// e.g.: Two arrows up means that x = 1 (increase left to right), y = 0
//
// TODO: remove it
export const BONDS_DIRS = {
  [Dir.no]       : [ 0,  0],
  [Dir.leftUp]   : [ 1, -1],
  [Dir.up]       : [ 1,  0],
  [Dir.upRight]  : [ 1,  1],
  [Dir.right]    : [ 0,  1],
  [Dir.rightDown]: [-1,  1],
  [Dir.down]     : [-1,  0],
  [Dir.downLeft] : [-1, -1],
  [Dir.left]     : [ 0, -1]
}