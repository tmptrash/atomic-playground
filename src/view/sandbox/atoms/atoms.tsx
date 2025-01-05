/**
 * Renders all atoms and inner bonds. Atom is just a colored square
 * with a letter in the center. Bonds are colored arrows of two types.
 * This component uses clever approach of analyzing all bonds positions first
 * and after that atoms will be rendered first and the bonds above them.
 * We need such analysis because bonds are located not only around an atom,
 * but also around near atoms.
 */
import React, { useEffect } from 'react'
import Konva from 'konva'
import { Vector2d } from 'konva/lib/types'
import { KonvaEventObject } from 'konva/lib/Node'
import { type } from 'irma5/src/atom'
import { AtomIndexes, EditModes, ATOM_NEW, Dir, BOND_TYPES, Atom as AtomType } from '../../../types'
import { store } from '../../../store/store'
import { atomUnder, findAtom, findAtomIdx, findVmIdx, nextAtom, parseAtom } from '../../../utils/atom'
import { toOffs } from '../../../utils'
import Atom from './atom/atom'
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
  const MODES: { [key: string]: (...args: any[]) => void } = {
    // mouse button: 0 - left, 2 - right
    [`${EditModes.Atom}-0-ctrl`]: onNextAtom,
    [`${EditModes.Atom}-0`]: onAddAtom,
    [`${EditModes.Atom}-2`]: onDelAtom,
    [`${EditModes.Bond}-0`]: onNextDir,
    [`${EditModes.Bond}-2`]: onNextType,
    [`${EditModes.VM}-0`]: onAddVM,
    [`${EditModes.VM}-2`]: onDelVM
  }
  const atoms = store.sandbox.atoms
  const bonds: IBonds = {}
  // we have to collect all bonds before rendering them to exclude
  // collisions and z-index issues. it happend when we render fix and
  // spl atoms, which put their bonds outside of it's atoms
  atoms.forEach(a => ATOM_BONDS?.[type(a.a) as AtomIndexes]?.(a, bonds))

  function onNextAtom() {
    store.status.atom = nextAtom(store.status.atom)
  }

  function onAddAtom(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex >= 0) { return }
    store.sandbox.atoms = [...store.sandbox.atoms, { id: `${toOffs(x, y)}`, x, y, a: ATOM_NEW[store.status.atom] } as unknown as AtomType]
    store.sandbox.synced = false
  }

  function onDelAtom(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex < 0) { return }
    let vmIndex = findVmIdx(x, y)
    while (vmIndex > -1) {
      const vms = store.sandbox.vms
      vms.splice(vmIndex, 1)
      store.sandbox.vms = [...vms]
      vmIndex = findVmIdx(x, y)
    }
    const atoms = store.sandbox.atoms
    atoms.splice(atomIndex, 1)
    store.sandbox.atoms = [...atoms]
    store.sandbox.synced = false
  }

  function onNextType(x: number, y: number) {
    const { a, i } = findAtom(x, y)
    if (i < 0) return
    const typ = type(a.a)
    const bondTypes = BOND_TYPES[typ]
    ++store.status.bondIdx >= bondTypes.length && (store.status.bondIdx = 0)
  }

  function onNextDir(x: number, y: number) {
    const { a, i } = findAtom(x, y)
    if (i < 0 || !a.a) return
    const atoms = store.sandbox.atoms
    const typ = type(a.a)
    let bondIdx = store.status.bondIdx
    if (bondIdx >= BOND_TYPES[typ].length) bondIdx = store.status.bondIdx = 0
    let d = (BOND_TYPES[typ]?.[bondIdx]?.[0] || BOND_TYPES[typ]?.[0]?.[0])?.(a.a) + 1
    //
    // only for next VM dir & bond 3 in con atom, which are have 4 bits we may set
    // "no bond" state for all other 3 bits bonds it's impossible to remove it
    //
    if (d > Dir.leftUp) {
      // VM dir or bond 3 of con atom
      if (bondIdx === 0 && typ !== AtomIndexes.con || typ === AtomIndexes.con && bondIdx === 3) d = Dir.no
      else d = Dir.up
    }
    a.a = (BOND_TYPES[typ]?.[bondIdx]?.[1] || BOND_TYPES[typ]?.[0]?.[1])?.(a.a, d)
    atoms[i] = a
    store.sandbox.atoms = [...atoms]
    store.sandbox.synced = false
  }

  function onAddVM(x: number, y: number) {
    store.sandbox.vms = [...store.sandbox.vms, {
      energy: store.status.energy,
      offs: toOffs(x, y)
    }]
    store.sandbox.synced = false
    store.sandbox.vms.length === 1 && (store.sandbox.vmIdx = 0)
  }

  function onDelVM(x: number, y: number) {
    const vms = store.sandbox.vms
    const offs = toOffs(x, y)
    const idx = vms.findIndex(vm => vm.offs === offs)
    if (idx < 0) return
    vms.splice(idx, 1)
    store.sandbox.vms = [...vms]
    if (store.sandbox.vmIdx > vms.length - 1) store.sandbox.vmIdx = vms.length - 1
    store.sandbox.synced = false
  }

  function onMousedown() {
    clickPos = stage.position()
  }

  function onMouseup(e: KonvaEventObject<MouseEvent>): void {
    const {a, ax, ay} = atomUnder(stage, zoom)
    const atom = a?.a?.a || 0
    store.status.curAtom = type(atom)
    MODES[getModeByMouse(e.evt)]?.(ax, ay)
    const updatedAtom = findAtom(ax!, ay!)
    store.status.hovers.atom = parseAtom(updatedAtom.a.a)
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
    <>{atoms.map(a => <Atom key={a.id} atom={a} stage={stage} zoom={zoom}/>)}</>
    <>{Object.values(bonds).map((v, i) => <Bonds key={i} bonds={v}/>)}</>
  </>
}