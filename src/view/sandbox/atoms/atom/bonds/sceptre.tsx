import React from 'react'
import { Text, Circle, Line } from 'react-konva'
import { Atom, DIR_OFFS, Dir } from '../../../../../types'
import { getLinePoints } from '../../../../../utils/bond'
import Config from '../../../../../config'

const LETTER_HEIGHT = 1.4

type Props = {
  a: Atom,
  dir: Dir,
  color: string,
  bondIdx: number
  bonds: number
  id?: string
}
export default function Sceptre({a, dir, color, bondIdx, bonds, id: id = ''}: Props) {
  if (dir === Dir.no) return <></>
  const points = getLinePoints(a.x, a.y, dir, bondIdx, bonds)

  function getFontHeight(dir: Dir) {
    if (dir === Dir.up) return -LETTER_HEIGHT
    if (dir === Dir.left || dir === Dir.right) return -LETTER_HEIGHT / 2
    return 0
  }

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
        radius={.8}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
      {id && <Text
        x={points[0] - a.id.length * .6 + DIR_OFFS[dir][0] * -2}
        y={points[1] + DIR_OFFS[dir][1] * -2 + getFontHeight(dir)}
        text={id}
        fontSize={2}
        fontStyle={'normal'}
        fontFamily={'Monospace'}
        fill={Config.textColor}
      />}
    </>
  )
}