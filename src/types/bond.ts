import { Dir } from './atom'
import { vmDir, b1Dir, b2Dir, ifDir, thenDir, elseDir, b3Dir, setVmDir, setB1Dir, 
  setB2Dir, setB3Dir, setIfDir, setThenDir, setElseDir } from 'irma5/src/atom'

export type LinePoints = [number, number, number, number]

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
export type Bond = [(a: number) => number, (a: number, d: number) => number, string]
export type BondType = [
  [],
  [Bond, Bond],
  [Bond, Bond, Bond],
  [Bond, Bond, Bond],
  [Bond, Bond, Bond, Bond],
  [Bond, Bond],
  [Bond, Bond, Bond]
]
//
// Bond getter & setter types depending on atom type
//
export const BOND_TYPES: BondType = [
  /* no  */[],
  /* mov */[[vmDir, setVmDir, 'next atom bond'], [b1Dir, setB1Dir, 'move dir']], 
  /* fix */[[vmDir, setVmDir, 'next atom bond'], [b1Dir, setB1Dir, 'atom 1 dir'], [b2Dir, setB2Dir, 'atom 2 dir']],
  /* spl */[[vmDir, setVmDir, 'next atom bond'], [b1Dir, setB1Dir, 'atom 1 dir'], [b2Dir, setB2Dir, 'atom 2 dir']],
  /* con */[[ifDir, setIfDir, 'if dir'], [thenDir, setThenDir, 'then dir'], [elseDir, setElseDir, 'else dir'], [b3Dir, setB3Dir, 'compare if dir']],
  /* job */[[vmDir, setVmDir, 'next atom bond'], [b1Dir, setB1Dir, 'new VM dir']],
  /* rep */[[vmDir, setVmDir, 'next atom bond'], [b1Dir, setB1Dir, 'arom 1 dir'], [b2Dir, setB2Dir, 'atom 2 dir']]
]