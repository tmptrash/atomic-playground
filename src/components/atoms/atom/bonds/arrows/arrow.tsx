import React from 'react';
import { Arrow as KonvaArrow } from 'react-konva';
import { Atom, Dir } from '../../../../../types/atom';
import { BondsState } from '../../../../../types/bond';
import { getLinePoints } from '../../../../../utils/bonds';

type Props = {
  a: Atom,
  dir: Dir,
  color: string,
  state: BondsState
}
export default function Arrow({a, dir, color, state}: Props) {
  if (dir === Dir.no) { return <></> }

  return (
    <KonvaArrow
      points={getLinePoints(a, dir, state)}
      stroke={color}
      strokeWidth={1}
      pointerLength={2}
      pointerWidth={1.5}
    />
  )
}