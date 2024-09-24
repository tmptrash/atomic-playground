import React from 'react'
import { vmDir, b1Dir, b2Dir } from 'irma5/src/atom'
import Config from "../../../../config"
import { AtomTypes } from "../../../../enums/enums"
import { Atom, Dir } from "../../../../types/atom"
import { BondsState } from "../../../../types/bond"
import { findBonds } from "../../../../utils/bonds"
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
  const vmd = vmDir(a.a)
  const movd = b1Dir(a.a)
  const bonds = vmd !== Dir.no && vmd === movd ? 2 : 1
  const lines = [<Arrow key={0} a={a} dir={movd} color={Config.bonds.movDirColor} bondIdx={0} bonds={bonds}/>]
  vmd !== Dir.no && lines.push(<Arrow key={1} a={a} dir={vmd} color={Config.vm.nextColor} bondIdx={vmd === movd ? 1 : 0} bonds={bonds}/>)
  return lines
}

function getFixBonds(a: Atom, bonds: BondsState, allBonds: BondsState[]) {
  const vmd = vmDir(a.a)
  const bond1Dir = b1Dir(a.a)
  const bond2Dir = b2Dir(a.a)
  const nearBonds = findBonds(a, bond2Dir, allBonds)
}