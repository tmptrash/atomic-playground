import React from 'react'
import { Arrow as KonvaArrow } from 'react-konva'
import { Atom, Dir } from '../../../../../../types/atom'
import { getLinePoints } from '../../../../../../utils/bonds'

type Props = {
  a: Atom;
  dir: Dir
  color: string
  bondIdx: number
  bonds: number
}
export default function Arrow({a, dir, color, bondIdx, bonds}: Props) {
  if (dir === Dir.no) return <></>

  return (
    <KonvaArrow
      points={getLinePoints(a.x, a.y, dir, bondIdx, bonds)}
      stroke={color}
      strokeWidth={1}
      pointerLength={2}
      pointerWidth={1.5}
    />
  )
}