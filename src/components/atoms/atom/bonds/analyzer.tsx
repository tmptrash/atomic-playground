import React, { ReactElement } from 'react'
import { vmDir, b1Dir, b2Dir } from 'irma5/src/atom'
import Config from "../../../../config"
import { AtomTypes } from "../../../../enums/enums"
import { Atom, Dir } from "../../../../types/atom"
import Arrow from "./arrows/arrow"
import Sceptre from './arrows/sceptre'
import { findAtomIdx, getXYByDir } from '../../../../utils/atom'
import { store } from '../../../../store/store'

type ArrowType = 'arrow' | 'sceptre'
interface IBond {
  a: Atom
  d: Dir
  col: string
  type: ArrowType
}

export const ATOM_BONDS = {
  [AtomTypes.no ]: noBonds,
  [AtomTypes.mov]: getMovBonds,
  [AtomTypes.fix]: getFixBonds,
  [AtomTypes.spl]: noBonds,
  [AtomTypes.con]: noBonds,
  [AtomTypes.job]: noBonds,
  [AtomTypes.rep]: noBonds
}

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
function noBonds(a: Atom) {}

function getArrows(bonds: IBond[]) {
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

function getMovBonds(a: Atom) {
  return getArrows([
    {a, d: vmDir(a.a), col: Config.vm.nextColor, type: 'arrow'},
    {a, d: b1Dir(a.a), col: Config.bonds.movDirColor, type: 'arrow'}
  ])
}

function getFixBonds(a: Atom) {
  const b1d = b1Dir(a.a)
  const bonds: IBond[] = [
    {a, d: vmDir(a.a), col: Config.vm.nextColor, type: 'arrow'},
    {a, d: b1d, col: Config.bonds.bond1Color, type: 'sceptre'}
  ]
  // find near atom
  const [x, y] = getXYByDir(a, b1d)
  const atomIdx = findAtomIdx(x, y)
  atomIdx >= 0 && bonds.push({
    a: store.sandbox.atoms[atomIdx],
    d: b2Dir(a.a),
    col: Config.bonds.bond2Color,
    type: 'sceptre'
  })
  
  return getArrows(bonds)
}