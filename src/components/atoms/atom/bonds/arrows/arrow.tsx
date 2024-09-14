import React from 'react'
import { Arrow as KonvaArrow } from 'react-konva'
import { Dir } from '../../../../../types/atom'
import { getLinePoints } from '../../../../../utils/bonds'

type Props = {
  x: number
  y: number
  dir: Dir
  color: string
  bondIdx: number
  bonds: number
}
export default function Arrow({x, y, dir, color, bondIdx, bonds}: Props) {
  if (dir === Dir.no) { return <></> }

  return (
    <KonvaArrow
      points={getLinePoints(x, y, dir, bondIdx, bonds)}
      stroke={color}
      strokeWidth={1}
      pointerLength={2}
      pointerWidth={1.5}
    />
  )
}