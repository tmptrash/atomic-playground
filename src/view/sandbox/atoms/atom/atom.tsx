import React from 'react'
import { type } from 'irma5/src/atom'
import { Circle, Rect, Text } from "react-konva"
import Config from "../../../../config"
import { ATOM_COLORS, ATOM_TEXTS, Atom as AtomType, AtomIndexes } from '../../../../types/atom'
import { store } from '../../../../store/store'
import { VM } from '../../../../types'
import { toOffs, toXY } from '../../../../utils'

type Props = {
  atom: AtomType
}
export default function Atom({atom}: Props) {
  const lineWidth = Config.grid.lineWidth
  const textColor = Config.textColor
  const step = Config.grid.stepSize
  const halfStep = step / 2
  const typ = type(atom.a)
  const offs = toOffs(atom.x, atom.y)
  const vms = store?.sandbox?.vms
  const vmAmount = vms.amount((vm: VM) => vm.offs === offs)
  const vmIdx: number = store.sandbox.vmIdx
  const [x, y] = toXY(vms?.[vmIdx]?.offs, step)
  const energy = vms?.[vmIdx]?.energy.toString()
  const inactiveVm = !!(vms?.[vmIdx]?.offs !== undefined && vms?.[vmIdx]?.offs !== offs && vmAmount)

  return <>
    {/* Atom rect */}
    <Rect
      x={atom.x + lineWidth}
      y={atom.y + lineWidth}
      width={step - lineWidth * 2}
      height={step - lineWidth * 2}
      strokeWidth={lineWidth}
      stroke={ATOM_COLORS[typ as AtomIndexes]}
      fill={ATOM_COLORS[typ as AtomIndexes]}/>

    {/* VMs amount on current atom */}
    {vmAmount > 1 && <Text
      x={atom.x + halfStep + 3.5}
      y={atom.y + halfStep + 3.3}
      text={`\u03A3${vmAmount}`}
      fontSize={2}
      fontFamily={'Monospace'}
      fill={Config.vm[`${inactiveVm ? 'inactive' : 'amount'}Color`]}
    />}
    
    { /* if current atom has a VM's, but they are not currently active */ }
    {inactiveVm && <>
      <Circle
        x={atom.x + halfStep}
        y={atom.y + halfStep}
        radius={13}
        stroke={Config.vm.inactiveColor}
        strokeWidth={1}
      />
      {vmAmount === 1 && <Text
        x={atom.x + halfStep - energy.length * .6}
        y={atom.y + halfStep + 3.9}
        text={energy}
        fontSize={2}
        fontFamily={'Monospace'}
        fill={Config.vm.inactiveColor}
      />}
    </>}

    {x === atom.x && y === atom.y && <>
      {/* Index of current running VM */}
      {vmAmount > 1 && <Text
        x={atom.x + halfStep - 4.9 - `${vmIdx}`.length * .6}
        y={atom.y + halfStep + 3.3}
        text={`#${vmIdx}`}
        fontSize={2}
        fontFamily={'Monospace'}
        fill={Config.vm.color}
      />}
      {/* Draw a circle if current atom is running with some VM */}
      <Circle
        x={atom.x + halfStep}
        y={atom.y + halfStep}
        radius={13}
        stroke={Config.vm.color}
        strokeWidth={1}
      />
      {/* Draw current VM energy */}
      <Text
        x={atom.x + halfStep - energy.length * .6}
        y={atom.y + halfStep + 3.9}
        text={energy}
        fontSize={2}
        fontFamily={'Monospace'}
        fill={Config.vm.energyColor}
      />
    </>}

    {/* The letter in atom center (m-mov, s-spl,...) */}
    <Text
      x={atom.x + halfStep - 3}
      y={atom.y + halfStep - 4}
      text={ATOM_TEXTS[typ as AtomIndexes]}
      fontSize={10}
      fontFamily={'Monospace'}
      fill={textColor}
    />
  </>
}