import React from 'react';
import { Line } from 'react-konva';
import Config from '../../../config';
import { AtomTypes } from '../../../enums/enums';
import { Atom, Dir } from '../../../types/atom';
import { getType, getVmDir } from '../../../utils/atom';

const ATOMS = {
  [AtomTypes.Mov]: drawMov,
  [AtomTypes.Fix]: drawMov,
  [AtomTypes.Spl]: drawMov,
  [AtomTypes.If]:  drawMov,
  [AtomTypes.Job]: drawMov
}
const BONDS_OFFS = {
  [Dir.no]       : [ 0,  0,   0,    0],
  [Dir.leftUp]   : [.1, .1, -.2,  -.2],
  [Dir.up]       : [.5, .1,  .5,  -.2],
  [Dir.upRight]  : [.9, .1, 1.2, -1.2],
  [Dir.right]    : [.9, .5, 1.2,   .5],
  [Dir.rightDown]: [.9, .9, 1.2,  1.2],
  [Dir.down]     : [.5, .9,  .5,  1.2],
  [Dir.downLeft] : [.1, .9, -.2,  1.2],
  [Dir.left]     : [.1, .5, -.2,   .5]
}

function getLinePoints(a: Atom, d: Dir, step: number): [number, number, number, number] {
  const offs = BONDS_OFFS[d];
  return [a.x + offs[0] * step, a.y + offs[1] * step, a.x + offs[2] * step, a.y + offs[3] * step];
}

function drawMov(a: Atom) {
  const step = Config.grid.stepSize;
  const dir = getVmDir(a.a);

  if (dir === Dir.no) { return <></> }

  return (
    <Line
      points={getLinePoints(a, dir, step)}
      stroke={Config.atoms.nextColor}
      strokeWidth={1}
    />
  )
}

export function Bonds(a: Atom) {
  return ATOMS[getType(a.a)](a);
}