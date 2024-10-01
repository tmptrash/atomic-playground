import React from 'react'
import { type } from 'irma5/src/atom'
import { Rect, Text } from "react-konva"
import Config from "../../../../config"
import { ATOM_COLORS, ATOM_TEXTS, Atom as AtomType } from '../../../../types/atom'

type Props = {
  atom: AtomType
}
export default function Atom({atom}: Props) {
  const lineWidth = Config.grid.lineWidth
  const textColor = Config.textColor
  const stepSize = Config.grid.stepSize
  const halfStep = stepSize / 2
  const typ = type(atom.a)

  return <>
    {/* Atom rect */}
    <Rect
      x={atom.x + lineWidth}
      y={atom.y + lineWidth}
      width={stepSize - lineWidth * 2}
      height={stepSize - lineWidth * 2}
      strokeWidth={lineWidth}
      stroke={ATOM_COLORS[typ]}
      fill={ATOM_COLORS[typ]}/>

    {/* The letter in atom center (m-mov, s-spl,...) */}
    <Text
      x={atom.x + halfStep - 3.2}
      y={atom.y + halfStep - 4}
      text={ATOM_TEXTS[typ]}
      fontSize={10}
      fontFamily={'Monospace'}
      fill={textColor}
    />
  </>
}