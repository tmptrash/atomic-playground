import React from 'react'
import { ifDir, thenDir, elseDir, vmDir, b1Dir, b2Dir } from 'irma5/src/atom'
import Config from "../../../../config"
import { AtomTypes } from "../../../../enums/enums"
import { Atom, Dir } from "../../../../types/atom"
import Arrow from "./arrows/arrow"
import Sceptre from './arrows/sceptre'
import { findAtomIdx, getXYByDir } from '../../../../utils/atom'
import { store } from '../../../../store/store'

type ArrowType = 'arrow' | 'sceptre'
export interface IBond {
  a: Atom
  d: Dir
  col: string
  type: ArrowType
}

export interface IBonds {
  [id: string]: IBond[]
}

export const ATOM_BONDS = {
  [AtomTypes.mov]: movBonds,
  [AtomTypes.fix]: fixSplBonds,
  [AtomTypes.spl]: fixSplBonds,
  [AtomTypes.con]: conBonds,
  [AtomTypes.job]: jobBonds,
  [AtomTypes.rep]: repBonds
}

export function getArrows(bonds: IBond[]) {
  const dirMap = {}
  const arrows: React.ReactElement[] = []
  // calc amount of bonds on all directions. [0] - index, [1] - amount
  bonds.forEach(({ d }) => {!dirMap[d] && (dirMap[d] = [0,0]), ++dirMap[d][1]})
  // create arrows according to bonds and amount on all derections
  bonds.forEach((d, i) => {
    let a: React.ReactElement
    switch (d.type) {
    case 'arrow':
      a = <Arrow key={i} a={d.a} dir={d.d} color={d.col} bondIdx={dirMap[d.d][0]++} bonds={dirMap[d.d][1]}/>
      break
    case 'sceptre':
      a = <Sceptre key={i} a={d.a} dir={d.d} color={d.col} bondIdx={dirMap[d.d][0]++} bonds={dirMap[d.d][1]}/>
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
    {a, d: b1d, col: Config.bonds.bond1Color, type: 'sceptre'}
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
    type: 'sceptre'
  })
}

function conBonds(a: Atom, bonds: IBonds) {
  const id = a.id
  !bonds[id] && (bonds[id] = [])
  bonds[id] = [
    ...bonds[id], 
    {a, d: ifDir(a.a), col: Config.bonds.bondIfColor, type: 'sceptre'},
    {a, d: thenDir(a.a), col: Config.bonds.bond1Color, type: 'sceptre'},
    {a, d: elseDir(a.a), col: Config.bonds.bond2Color, type: 'sceptre'}
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
    {a, d: b1Dir(a.a), col: Config.bonds.bond1Color, type: 'sceptre'},
    {a, d: b2Dir(a.a), col: Config.bonds.bond2Color, type: 'sceptre'}
  ]
}