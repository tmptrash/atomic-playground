/**
 * Renders all atoms and inner bonds. Atom is just a colored square
 * with a letter in the center. Bonds are colored arrows of two types.
 * This component uses clever approach of analyzing all bonds positions first
 * and after that atoms will be rendered first and the bonds above them.
 * We need such analysis because bonds are located not only around an atom,
 * but also around near atoms.
 */
// TODO: move this code to atom.tsx
// TODO: should be two modes:
// TODO:   1. atoms: left - change atom;           right - del atom
// TODO:   2. bones: left - change bond direction; right - change bond type (vm, mov, if, then,...)
import Konva from 'konva'
import { Vector2d } from 'konva/lib/types'
import React, { useEffect } from 'react'
import { type } from 'irma5/src/atom'
import Config from '../../config'
import { Modes } from '../../enums/enums'
import { store } from '../../store/store'
import { ATOMS } from '../../types/atom'
import { BondData, BondsState } from '../../types/bond'
import { findAtomIdx, nextAtom } from '../../utils/atom'
import { id } from '../../utils/utils'
import Atom from './atom/atom'
import { ATOM_BONDS } from './atom/bonds/analyzer'
import { Bonds } from './atom/bonds/bonds'
import { KonvaEventObject } from 'konva/lib/Node'

type ModeKey = `${Modes.Atoms}-0` | `${Modes.Atoms}-2` | `${Modes.Bonds}-0` | `${Modes.Bonds}-2`
type Props = {
  stage: Konva.Stage | null,
  zoom: number
}
export default function Atoms({ stage, zoom }: Props) {
  let clickPos: Vector2d = {x: -1, y: -1}
  const zeros = Array(8).fill(0)
  const states = store.sandbox.atoms.map(atom => ({ atom, bonds: [...zeros], curBonds: [...zeros], bondDatas: zeros.map(() => []) as BondData[][] })) as BondsState[]
  const modes = {
    // mouse button: 0 - left, 2 - right
    [`${Modes.Atoms}-0-ctrl`]: onChange,
    [`${Modes.Atoms}-0`]: onAdd,
    [`${Modes.Atoms}-2`]: onDel,
    [`${Modes.Bonds}-0`]: onEditBond,
    [`${Modes.Bonds}-2`]: onEditType
  }
  //
  // It's important to split creation of bonds, running atoms callbacks and drawing them
  //
  store.sandbox.atoms.forEach((a, i) => ATOM_BONDS[type(a.a)](a, states[i], states))
  //
  // Turns off right mouse button context menu
  //
  window.oncontextmenu = () => false

  function onChange(x: number, y: number) {
    store.status.atom = nextAtom(store.status.atom)
  }

  function onAdd(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex >= 0) { return }
    store.sandbox.atoms = [...store.sandbox.atoms, { id: id(), x, y, a: ATOMS[store.status.atom] }]
  }

  function onDel(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex < 0) { return }
    const atoms = store.sandbox.atoms
    atoms.splice(atomIndex, 1)
    store.sandbox.atoms = [...atoms]
  }

  function onEditType(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex < 0) { return }
    const atoms = store.sandbox.atoms
    const a = atoms[atomIndex]
    atoms[atomIndex] = { id: a.id, x: a.x, y: a.y, a: nextAtom(type(a.a)) }
    store.sandbox.atoms = [...atoms]
  }

  function onEditBond(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex < 0) { return }
    const atoms = store.sandbox.atoms
    const a = atoms[atomIndex]
    atoms[atomIndex] = { id: a.id, x: a.x, y: a.y, a: nextAtom(type(a.a)) }
    store.sandbox.atoms = [...atoms]
  }

  function getRelatedPos(): [number, number] {
    if (stage === null) { return [-1, -1] }
    const pos = stage.getPointerPosition() as Vector2d
    return [(pos.x - stage.position().x) / zoom, (pos.y - stage.position().y) / zoom]
  }

  function onMousedown() {
    if (!stage) { return }
    clickPos = stage.position()
  }

  function onMouseup(e: KonvaEventObject<MouseEvent>): void {
    if (!stage) { return }
    const pos = stage.position()
    if (pos.x !== clickPos.x || pos.y !== clickPos.y) { return }
    const [x, y] = getRelatedPos()
    const step = Config.grid.stepSize
    const [ax, ay] = [Math.floor(x / step) * step, Math.floor(y / step) * step];
    if (ax < 0 || ay < 0 || ax >= Config.grid.rows * step || ay >= Config.grid.cols * step) { return }
    modes[getModeByMouse(e.evt)](ax, ay)
  }

  function getModeByMouse(e: MouseEvent): ModeKey {
    return `${store.status.mode}-${e.button}${e.ctrlKey ? '-ctrl' : ''}` as ModeKey
  }

  function onDestroy() {
    if (!stage) { return }
    stage.off('mouseup', onMouseup)
    stage.off('mousedown', onMousedown)
  }

  useEffect(() => {
    if (!stage) { return }
    stage.on('mouseup', onMouseup)
    stage.on('mousedown', onMousedown)
    return onDestroy
  }, [stage, zoom])

  return (
    <>
      {store.sandbox.atoms.map(a => <Atom key={a.id} {...a}/>)}
      {store.sandbox.atoms.map((a, i) => <Bonds key={a.id} a={a} state={states[i]}/>)}
    </>
  )
}