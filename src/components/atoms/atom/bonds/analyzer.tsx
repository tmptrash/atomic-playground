import React from 'react'
import Config from "../../../../config"
import { AtomTypes } from "../../../../enums/enums"
import { Atom, Dir } from "../../../../types/atom"
import { BondsState } from "../../../../types/bond"
import { getBond1Dir, getBond2Dir, getMovDir, getVmDir } from "../../../../utils/atom"
import { addBonds, findBonds } from "../../../../utils/bonds"
import Arrow from "./arrows/arrow"

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

function getMovBonds(a: Atom) {
  const vmDir = getVmDir(a.a)
  const bonds = vmDir === Dir.no ? 1 : 2
  const lines = [<Arrow key={0} a={a} dir={getMovDir(a.a)} color={Config.bonds.movDirColor} bondIdx={0} bonds={bonds}/>]
  bonds > 1 && lines.push(<Arrow key={1} a={a} dir={vmDir} color={Config.vm.nextColor} bondIdx={1} bonds={bonds}/>)
  return lines
}

function getFixBonds(a: Atom, bonds: BondsState, allBonds: BondsState[]) {
  const vmDir = getVmDir(a.a)
  const bond1Dir = getBond1Dir(a.a)
  const bond2Dir = getBond2Dir(a.a)
  const nearBonds = findBonds(a, bond2Dir, allBonds)

  addBonds([
    { type: 'Arrow', dir: vmDir, color: Config.vm.nextColor },
    { type: 'Sceptre', dir: bond1Dir, color: Config.bonds.bond1Color },
  ], bonds
  )
  nearBonds && addBonds([
    { type: 'Sceptre', dir: vmDir, color: Config.bonds.bond2Color },
  ], nearBonds
  )
}