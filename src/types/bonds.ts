import { Dir } from './atom';

export type LinePoints = [number, number, number, number];

export type BondArrows = {
  arrows: [number, number, number, number, number, number, number, number],
  curArrows: [number, number, number, number, number, number, number, number]
}
// Offsets for only one bond
export const BONDS_OFFS = {
  [Dir.no]       : [ 0,  0,   0,    0],
  [Dir.leftUp]   : [.2, .2, -.2,  -.2],
  [Dir.up]       : [.5, .2,  .5,  -.2],
  [Dir.upRight]  : [.8, .2, 1.2,  -.2],
  [Dir.right]    : [.8, .5, 1.2,   .5],
  [Dir.rightDown]: [.8, .8, 1.2,  1.2],
  [Dir.down]     : [.5, .8,  .5,  1.2],
  [Dir.downLeft] : [.2, .8, -.2,  1.2],
  [Dir.left]     : [.2, .5, -.2,   .5]
}
//
// Describes direction of the next arrow within one direction.
// e.g.: Two arrows up means that x = 1 (increase left to right), y = 0
//
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