/**
 * Renders all atoms and inner bonds. Atom is just a colored square
 * with a letter in the center. Bonds are colored arrows of two types.
 * This component uses clever approach of analyzing all bonds positions first
 * and after that atoms will be rendered first and the bonds above them.
 * We need such analysis because bonds are located not only around an atom,
 * but also around near atoms.
 */
import Konva from 'konva'
import { Vector2d } from 'konva/lib/types'
import React, { useEffect } from 'react'
import { type } from 'irma5/src/atom'
import Config from '../../config'
import { Modes } from '../../enums/enums'
import { store } from '../../store/store'
import { ATOMS, Dir } from '../../types/atom'
import { findAtom, findAtomIdx, nextAtom } from '../../utils/atom'
import { id } from '../../utils/utils'
import Atom from './atom/atom'
import { KonvaEventObject } from 'konva/lib/Node'
import { BOND_TYPES } from '../../types/bond'
import { Bonds } from './atom/bonds/bonds'
import { ATOM_BONDS, IBonds } from './atom/bonds/analyzer'

//
// Turns off right mouse button context menu
//
window.oncontextmenu = () => false

type Props = {
  stage: Konva.Stage,
  zoom: number
}
export default function Atoms({ stage, zoom }: Props) {
  let clickPos: Vector2d = {x: -1, y: -1}
  const MODES = {
    // mouse button: 0 - left, 2 - right
    [`${Modes.Atoms}-0-ctrl`]: onNextAtom,
    [`${Modes.Atoms}-0`]: onAddAtom,
    [`${Modes.Atoms}-2`]: onDelAtom,
    [`${Modes.Bonds}-0`]: onDir,
    [`${Modes.Bonds}-2`]: onType
  }
  const atoms = store.sandbox.atoms
  const bonds: IBonds = {}
  // we have to collect all bonds before rendering them to exclude 
  // collisions and z-index issues. it happend when we render fix and
  // spl atoms, which put their bonds outside of it's atoms
  atoms.forEach(a => ATOM_BONDS?.[type(a.a)]?.(a, bonds))

  function onNextAtom() {
    store.status.atom = nextAtom(store.status.atom)
  }

  function onAddAtom(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex >= 0) { return }
    store.sandbox.atoms = [...store.sandbox.atoms, { id: id(), x, y, a: ATOMS[store.status.atom] }]
  }

  function onDelAtom(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex < 0) { return }
    const atoms = store.sandbox.atoms
    atoms.splice(atomIndex, 1)
    store.sandbox.atoms = [...atoms]
  }

  function onType(x: number, y: number) {
    const { a, i } = findAtom(x, y)
    if (!i) return
    const atoms = store.sandbox.atoms
    atoms[i] = { id: a.id, x: a.x, y: a.y, a: nextAtom(type(a.a)) }
    store.sandbox.atoms = [...atoms]
  }

  function onDir(x: number, y: number) {
    const { a, i } = findAtom(x, y)
    if (i === undefined || !a.a) return
    const atoms = store.sandbox.atoms
    const t = type(a.a)
    let d = (BOND_TYPES[t]?.[store.status.bondIdx]?.[0] || BOND_TYPES[t]?.[0]?.[0])?.(a.a) + 1
    if (d > Dir.leftUp) { d = Dir.up }
    a.a = (BOND_TYPES[t]?.[store.status.bondIdx]?.[1] || BOND_TYPES[t]?.[0]?.[1])?.(a.a, d)
    atoms[i] = a
    store.sandbox.atoms = [...atoms]
  }

  function getRelatedPos(): [number, number] {
    const pos = stage.getPointerPosition() as Vector2d
    return [(pos.x - stage.position().x) / zoom, (pos.y - stage.position().y) / zoom]
  }

  function onMousedown() {
    clickPos = stage.position()
  }

  function onMouseup(e: KonvaEventObject<MouseEvent>): void {
    const pos = stage.position()
    if (pos.x !== clickPos.x || pos.y !== clickPos.y) { return }
    const [x, y] = getRelatedPos()
    const step = Config.grid.stepSize
    const [ax, ay] = [Math.floor(x / step) * step, Math.floor(y / step) * step]
    if (ax < 0 || ay < 0 || ax >= Config.grid.rows * step || ay >= Config.grid.cols * step) { return }
    MODES[getModeByMouse(e.evt)](ax, ay)
  }

  function getModeByMouse(e: MouseEvent): string {
    return `${store.status.mode}-${e.button}${e.ctrlKey ? '-ctrl' : ''}`
  }

  function onDestroy() {
    stage.off('mouseup', onMouseup)
    stage.off('mousedown', onMousedown)
  }

  useEffect(() => {
    stage.on('mouseup', onMouseup)
    stage.on('mousedown', onMousedown)
    return onDestroy
  }, [stage, zoom])

  return <>
    <>{atoms.map(a => <Atom key={a.id} atom={a}/>)}</>
    <>{Object.values(bonds).map((v, i) => <Bonds key={i} bonds={v}/>)}</>
  </>
}