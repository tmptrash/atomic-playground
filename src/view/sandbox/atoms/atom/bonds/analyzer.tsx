import React from 'react'
import { ifDir, thenDir, elseDir, vmDir, b1Dir, b2Dir, b3Dir } from 'irma5/src/atom'
import Config from "../../../../../config"
import { AtomIndexes, Atom, Dir, AtomKeys } from "../../../../../types"
import Arrow from "./arrow"
import Sceptre from './sceptre'
import { findAtomIdx, getXYByDir } from '../../../../../utils/atom'
import { store } from '../../../../../store/store'

// TODO: put these functions into <Bonds /> component
type ArrowType = 'arrow' | 'sceptre'
export interface IBond {
  a: Atom
  d: Dir
  col: string
  type: ArrowType
  id?: string
}

export interface IBonds {
  [id: string]: IBond[]
}

export const ATOM_BONDS: AtomKeys = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  [AtomIndexes.no] : () => {},
  [AtomIndexes.mov]: movBonds,
  [AtomIndexes.fix]: fixSplBonds,
  [AtomIndexes.spl]: fixSplBonds,
  [AtomIndexes.con]: conBonds,
  [AtomIndexes.job]: jobBonds,
  [AtomIndexes.rep]: repBonds
}

export function getArrows(bonds: IBond[]) {
  const dirMap = {}
  const arrows: React.ReactElement[] = []
  // calc amount of bonds on all directions. [0] - index, [1] - amount
  bonds.forEach(({ d }) => {!dirMap[d] && (dirMap[d] = [0,0]), ++dirMap[d][1]})
  // create arrows according to bonds and amount on all derections
  bonds.forEach((b, i) => {
    let a: React.ReactElement
    switch (b.type) {
    case 'arrow':
      a = <Arrow key={i} a={b.a} dir={b.d} color={b.col} bondIdx={dirMap[b.d][0]++} bonds={dirMap[b.d][1]}/>
      break
    case 'sceptre':
      a = <Sceptre key={i} a={b.a} dir={b.d} color={b.col} bondIdx={dirMap[b.d][0]++} bonds={dirMap[b.d][1]} id={b.id}/>
      break
    }
    a && arrows.push(a)
  })

  return arrows
}

function movBonds(a: Atom, bonds: IBonds) {
  const id = a.id
  !bonds[id] && (bonds[id] = [])
  bonds[id] = [
    ...bonds[id], 
    {a, d: vmDir(a.a), col: Config.vm.nextColor, type: 'arrow'},
    {a, d: b1Dir(a.a), col: Config.bonds.movDirColor, type: 'arrow'}
  ]
}

function fixSplBonds(a: Atom, bonds: IBonds) {
  let id = a.id
  !bonds[id] && (bonds[id] = [])
  const b1d = b1Dir(a.a)
  bonds[id] = [
    ...bonds[id],
    {a, d: vmDir(a.a), col: Config.vm.nextColor, type: 'arrow'},
    {a, d: b1d, col: Config.bonds.bond1Color, type: 'sceptre', id: a.id}
  ]

  // find near atom
  const [x, y] = getXYByDir(a, b1d)
  const atomIdx = findAtomIdx(x, y)
  if (atomIdx < 0) return
  const atoms = store.sandbox.atoms
  id = atoms[atomIdx].id
  !bonds[id] && (bonds[id] = [])
  bonds[id].push({
    a: atoms[atomIdx],
    d: b2Dir(a.a),
    col: Config.bonds.bond2Color,
    type: 'sceptre',
    id: a.id
  })
}

function conBonds(a: Atom, bonds: IBonds) {
  const id = a.id
  !bonds[id] && (bonds[id] = [])
  bonds[id] = [
    ...bonds[id], 
    {a, d: ifDir(a.a), col: Config.bonds.bondIfColor, type: 'sceptre', id: a.id},
    {a, d: thenDir(a.a), col: Config.bonds.bond1Color, type: 'sceptre'},
    {a, d: elseDir(a.a), col: Config.bonds.bond2Color, type: 'sceptre'},
    {a, d: b3Dir(a.a), col: Config.bonds.vmDirColor, type: 'sceptre', id: a.id}
  ]
}

function jobBonds(a: Atom, bonds: IBonds) {
  const id = a.id
  !bonds[id] && (bonds[id] = [])
  bonds[id] = [
    ...bonds[id], 
    {a, d: vmDir(a.a), col: Config.vm.nextColor, type: 'arrow'},
    {a, d: b1Dir(a.a), col: Config.bonds.bond1Color, type: 'sceptre'}
  ]
}

function repBonds(a: Atom, bonds: IBonds) {
  const id = a.id
  !bonds[id] && (bonds[id] = [])
  bonds[id] = [
    ...bonds[id], 
    {a, d: vmDir(a.a), col: Config.vm.nextColor, type: 'arrow'},
    {a, d: b1Dir(a.a), col: Config.bonds.bond1Color, type: 'sceptre', id: a.id},
    {a, d: b2Dir(a.a), col: Config.bonds.bond2Color, type: 'sceptre', id: a.id}
  ]
}