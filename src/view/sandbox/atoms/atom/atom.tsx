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
  const vmAmount = store.sandbox.vms.amount((vm: VM) => vm.offs === offs)
  const [x, y] = toXY(store.sandbox.vms?.[store.sandbox.vmIdx]?.offs, step)
  const energy = store.sandbox.vms?.[store.sandbox.vmIdx]?.energy.toString()

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
    {vmAmount > 0 && <Text
      x={atom.x + halfStep + 3.3}
      y={atom.y + halfStep + 3.3}
      text={vmAmount.toString()}
      fontSize={2}
      fontFamily={'Monospace'}
      fill={Config.vm.color}
    />}

    {/* Draw a circle if current atom is running with some VM + energy */}
    {x === atom.x && y === atom.y && <>
      <Circle
        x={atom.x + halfStep}
        y={atom.y + halfStep}
        radius={13}
        stroke={Config.vm.color}
        strokeWidth={1}
      />
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