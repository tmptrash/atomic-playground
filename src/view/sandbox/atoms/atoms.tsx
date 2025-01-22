/**
 * Renders all atoms and inner bonds. Atom is just a colored square
 * with a letter in the center. Bonds are colored arrows of two types.
 * This component uses clever approach of analyzing all bonds positions first
 * and after that atoms will be rendered first and the bonds above them.
 * We need such analysis because bonds are located not only around an atom,
 * but also around near atoms.
 */
import React, { useEffect } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import Konva from 'konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { type } from 'irma5/src/atom'
import { AtomIndexes, EditModes, ATOM_NEW, Dir, BOND_TYPES, Atom as AtomType } from '../../../types'
import { atomUnder, findAtom, findAtomIdx, findVmIdx, nextAtom, parseAtom } from '../../../utils/atom'
import { toOffs } from '../../../utils'
import Atom from './atom/atom'
import { Bonds } from './atom/bonds/bonds'
import { ATOM_BONDS, IBonds } from './atom/bonds/analyzer'
import { ADD_ATOM_SIGNAL, ADD_BOND_IDX_SIGNAL, ATOMS_SIGNAL, CUR_ATOM_SIGNAL, ENERGY_SIGNAL, HOVERED_ATOM_SIGNAL, MODE_SIGNAL, SYNCED_SIGNAL, VMS_SIGNAL, VM_IDX_SIGNAL } from '../../../signals'
//
// Turns off right mouse button context menu
//
window.oncontextmenu = () => false

type Props = {
  stage: Konva.Stage,
  zoom: number
}
export default function Atoms({ stage, zoom }: Props) {
  useSignals()
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
  const bonds: IBonds = {}
  // we have to collect all bonds before rendering them to exclude
  // collisions and z-index issues. it happend when we render fix and
  // spl atoms, which put their bonds outside of it's atoms
  ATOMS_SIGNAL.value.forEach(a => ATOM_BONDS?.[type(a.a) as AtomIndexes]?.(a, bonds))

  function onNextAtom() {
    ADD_ATOM_SIGNAL.value = nextAtom(ADD_ATOM_SIGNAL.value)
  }

  function onAddAtom(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex >= 0) { return }
    ATOMS_SIGNAL.value = [...ATOMS_SIGNAL.value, { id: `${toOffs(x, y)}`, x, y, a: ATOM_NEW[ADD_ATOM_SIGNAL.value] } as unknown as AtomType]
    SYNCED_SIGNAL.value = false
  }

  function onDelAtom(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex < 0) { return }
    let vmIndex = findVmIdx(x, y)
    while (vmIndex > -1) {
      const vms = VMS_SIGNAL.value
      vms.splice(vmIndex, 1)
      VMS_SIGNAL.value = [...vms]
      vmIndex = findVmIdx(x, y)
    }
    const atoms = ATOMS_SIGNAL.value
    atoms.splice(atomIndex, 1)
    ATOMS_SIGNAL.value = [...atoms]
    SYNCED_SIGNAL.value = false
  }

  function onNextType(x: number, y: number) {
    const { a, i } = findAtom(x, y)
    if (i < 0) return
    const typ = type(a.a)
    const bondTypes = BOND_TYPES[typ]
    ++ADD_BOND_IDX_SIGNAL.value >= bondTypes.length && (ADD_BOND_IDX_SIGNAL.value = 0)
  }

  function onNextDir(x: number, y: number) {
    const { a, i } = findAtom(x, y)
    if (i < 0 || !a.a) return
    const atoms = ATOMS_SIGNAL.value
    const typ = type(a.a)
    let bondIdx = ADD_BOND_IDX_SIGNAL.value
    if (bondIdx >= BOND_TYPES[typ].length) bondIdx = ADD_BOND_IDX_SIGNAL.value = 0
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
    ATOMS_SIGNAL.value = [...atoms]
    SYNCED_SIGNAL.value = false
  }

  function onAddVM(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y)
    if (atomIndex < 0) { return }
    VMS_SIGNAL.value = [...VMS_SIGNAL.value, {
      energy: ENERGY_SIGNAL.value,
      offs: toOffs(x, y)
    }]
    SYNCED_SIGNAL.value = false
    VMS_SIGNAL.value.length === 1 && (VM_IDX_SIGNAL.value = 0)
  }

  function onDelVM(x: number, y: number) {
    const vms = VMS_SIGNAL.value
    const offs = toOffs(x, y)
    const idx = vms.findIndex(vm => vm.offs === offs)
    if (idx < 0) return
    vms.splice(idx, 1)
    VMS_SIGNAL.value = [...vms]
    if (VM_IDX_SIGNAL.value > vms.length - 1) VM_IDX_SIGNAL.value = vms.length - 1
    SYNCED_SIGNAL.value = false
  }

  function onMouseup(e: KonvaEventObject<MouseEvent>): void {
    const {a, ax, ay} = atomUnder(stage, zoom)
    if (ax === undefined || ay === undefined) return
    const atom = a?.a?.a || 0
    CUR_ATOM_SIGNAL.value = type(atom)
    MODES[getModeByMouse(e.evt)]?.(ax, ay)
    const updatedAtom = findAtom(ax!, ay!)
    HOVERED_ATOM_SIGNAL.value = updatedAtom.a.a ? parseAtom(updatedAtom.a.a) : ''
  }

  function getModeByMouse(e: MouseEvent): string {
    return `${MODE_SIGNAL.value}-${e.button}${e.ctrlKey ? '-ctrl' : ''}`
  }

  function onDestroy() {
    stage.off('mouseup', onMouseup)
  }

  useEffect(() => {
    stage.on('mouseup', onMouseup)
    return onDestroy
  }, [stage, zoom])

  return <>
    <>{ATOMS_SIGNAL.value.map(a => <Atom key={a.id} atom={a} stage={stage} zoom={zoom}/>)}</>
    <>{Object.values(bonds).map((v, i) => <Bonds key={i} bonds={v}/>)}</>
  </>
}