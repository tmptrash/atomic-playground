import React from 'react';
import { Arrow as KonvaArrow } from 'react-konva';
import { Atom, Dir } from '../../../../types/atom';
import { BondArrows } from '../../../../types/bonds';
import { getLinePoints } from '../../../../utils/bonds';

type Props = {
  a: Atom,
  dir: Dir,
  color: string,
  arrows: BondArrows
}
export default function Arrow({a, dir, color, arrows}: Props) {
  if (dir === Dir.no) { return <></> }

  return (
    <KonvaArrow
      points={getLinePoints(a, dir, arrows)}
      stroke={color}
      strokeWidth={1}
      pointerLength={2}
      pointerWidth={1.5}
    />
  )
}