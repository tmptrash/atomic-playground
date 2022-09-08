import React from 'react';
import { Arrow, Circle } from 'react-konva';
import { Atom, Dir } from '../../../../../types/atom';
import { BondArrows } from '../../../../../types/bonds';
import { getLinePoints } from '../../../../../utils/bonds';

type Props = {
  a: Atom,
  dir: Dir,
  color: string,
  arrows: BondArrows
}
export default function Sceptre({a, dir, color, arrows}: Props) {
  const points = getLinePoints(a, dir, arrows);

  if (dir === Dir.no) { return <></> }
  return (
    <>
      <Arrow
        points={points}
        stroke={color}
        strokeWidth={1}
        pointerLength={2}
        pointerWidth={1.5}
      />
      <Circle
        x={points[2]}
        y={points[3]}
        radius={10}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </>
  )
}