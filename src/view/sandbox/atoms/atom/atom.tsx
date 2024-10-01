import React from 'react'
import { type } from 'irma5/src/atom'
import { Circle, Rect, Text } from "react-konva"
import Config from "../../../../config"
import { ATOM_COLORS, ATOM_TEXTS, Atom as AtomType } from '../../../../types/atom'
import { store } from '../../../../store/store'

type Props = {
  atom: AtomType
}
export default function Atom({atom}: Props) {
  const lineWidth = Config.grid.lineWidth
  const textColor = Config.textColor
  const step = Config.grid.stepSize
  const halfStep = step / 2
  const typ = type(atom.a)
  const offs = atom.y / step * Config.grid.cols + atom.x / step
  const hasVm = store.sandbox.vms.findIndex(vm => vm.offs === offs) > -1

  console.log('atom')
  
  return <>
    {/* Atom rect */}
    <Rect
      x={atom.x + lineWidth}
      y={atom.y + lineWidth}
      width={step - lineWidth * 2}
      height={step - lineWidth * 2}
      strokeWidth={lineWidth}
      stroke={ATOM_COLORS[typ]}
      fill={ATOM_COLORS[typ]}/>

    {/* VM circle */}
    {hasVm && <Circle
      x={atom.x + halfStep}
      y={atom.y + halfStep}
      radius={13}
      stroke={Config.vm.color}
      strokeWidth={1}
    />}

    {/* The letter in atom center (m-mov, s-spl,...) */}
    <Text
      x={atom.x + halfStep - 3}
      y={atom.y + halfStep - 4}
      text={ATOM_TEXTS[typ]}
      fontSize={10}
      fontFamily={'Monospace'}
      fill={textColor}
    />
  </>
}