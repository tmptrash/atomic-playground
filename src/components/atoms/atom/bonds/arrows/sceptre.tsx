import React from 'react'
import { Arrow, Circle, Line } from 'react-konva'
import { Atom, Dir } from '../../../../../types/atom'
import { getLinePoints } from '../../../../../utils/bonds'

type Props = {
  a: Atom,
  dir: Dir,
  color: string,
  bondIdx: number
  bonds: number
}
export default function Sceptre({a, dir, color, bondIdx, bonds}: Props) {
  if (dir === Dir.no) return <></>
  const points = getLinePoints(a.x, a.y, dir, bondIdx, bonds)

  return (
    <>
      <Line
        points={points}
        stroke={color}
        strokeWidth={1}
        pointerLength={2}
        pointerWidth={1.5}
      />
      <Circle
        x={points[2]}
        y={points[3]}
        radius={1}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </>
  )
}