import { Atom, Dir } from './atom'
import { vmDir, b1Dir, b2Dir, ifDir, thenDir, elseDir, b3Dir, setVmDir, setB1Dir, 
  setB2Dir, setB3Dir, setIfDir, setThenDir, setElseDir } from 'irma5/src/atom'

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
  [Dir.up]       : [.5, .3,  .5,  .03,  .1,   0, -.1,   0],
  [Dir.upRight]  : [.7, .3, .97,  .03,   0,  .1, -.1,   0],
  [Dir.right]    : [.7, .5, .97,   .5,   0,  .1,   0, -.1],
  [Dir.rightDown]: [.7, .7, .97,  .97,   0, -.1, -.1,   0],
  [Dir.down]     : [.5, .7,  .5,  .97, -.1,   0,  .1,   0],
  [Dir.downLeft] : [.3, .7, .03,  .97, -.1,   0,   0, -.1],
  [Dir.left]     : [.3, .5, .03,   .5,   0, -.1,   0,  .1],
  [Dir.leftUp]   : [.3, .3, .03,  .03,  .1,   0,   0,  .1]
}
//
// Bond setter types depending on atom type
//
export const BOND_SET_TYPES = [
  [],                                           // no atom
  [setVmDir, setB1Dir],                         // mov 
  [setVmDir, setB1Dir, setB2Dir],               // fix
  [setVmDir, setB1Dir, setB2Dir],               // spl
  [setIfDir, setThenDir, setElseDir, setB3Dir], // con
  [setVmDir, setB1Dir],                         // job
  [setVmDir, setB1Dir, setB2Dir]                // rep
]
//
// Bond getter types depending on atom type
//
export const BOND_GET_TYPES = [
  [],                                           // no atom
  [vmDir, b1Dir],                               // mov 
  [vmDir, b1Dir, b2Dir],                        // fix
  [vmDir, b1Dir, b2Dir],                        // spl
  [ifDir, thenDir, elseDir, b3Dir],             // con
  [vmDir, b1Dir],                               // job
  [vmDir, b1Dir, b2Dir]                         // rep
]
//
// Describes direction of the next arrow within one direction.
// e.g.: Two arrows up means that x = 1 (increase left to right), y = 0
//
// TODO: remove it
export const BONDS_DIRS = {
  [Dir.no]       : [ 0,  0],
  [Dir.up]       : [ 1,  0],
  [Dir.upRight]  : [ 1,  1],
  [Dir.right]    : [ 0,  1],
  [Dir.rightDown]: [-1,  1],
  [Dir.down]     : [-1,  0],
  [Dir.downLeft] : [-1, -1],
  [Dir.left]     : [ 0, -1],
  [Dir.leftUp]   : [ 1, -1]
}