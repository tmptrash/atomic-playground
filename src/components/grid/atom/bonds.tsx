import React from 'react';
import { Arrow } from 'react-konva';
import Config from '../../../config';
import { AtomTypes } from '../../../enums/enums';
import { Atom, Dir } from '../../../types/atom';
import { getType, getVmDir, getMovDir } from '../../../utils/atom';

const ATOMS = {
  [AtomTypes.Mov]: drawMov,
  [AtomTypes.Fix]: drawEmpty,
  [AtomTypes.Spl]: drawEmpty,
  [AtomTypes.If]:  drawEmpty,
  [AtomTypes.Job]: drawEmpty
}
const BONDS_OFFS = {
  [Dir.no]       : [ 0,  0,   0,    0],
  [Dir.leftUp]   : [.2, .2, -.2,  -.2],
  [Dir.up]       : [.5, .2,  .5,  -.2],
  [Dir.upRight]  : [.8, .2, 1.2, -1.2],
  [Dir.right]    : [.8, .5, 1.2,   .5],
  [Dir.rightDown]: [.8, .8, 1.2,  1.2],
  [Dir.down]     : [.5, .8,  .5,  1.2],
  [Dir.downLeft] : [.2, .8, -.2,  1.2],
  [Dir.left]     : [.2, .5, -.2,   .5]
}

function getLinePoints(a: Atom, d: Dir, step: number): [number, number, number, number] {
  const offs = BONDS_OFFS[d];
  return [a.x + offs[0] * step, a.y + offs[1] * step, a.x + offs[2] * step, a.y + offs[3] * step];
}

function drawMov(a: Atom) {
  const step = Config.grid.stepSize;
  const vmDir = getVmDir(a.a);
  const movDir = getMovDir(a.a);

  if (vmDir === Dir.no) { return <></> }

  return (
    <>
      {/* next atom dir for VM */}
      <Arrow
        points={getLinePoints(a, vmDir, step)}
        stroke={Config.vm.nextColor}
        strokeWidth={1}
        pointerLength={2}
        pointerWidth={2}
      />
      {/* mov dir */}
      <Arrow
        points={getLinePoints(a, movDir, step)}
        stroke={Config.atoms.movDirColor}
        strokeWidth={1}
        pointerLength={2}
        pointerWidth={2}
      />
    </>
  )
}

// TODO: will be removed soon
function drawEmpty() {
  return <></>
}

export function Bonds(a: Atom) {
  return ATOMS[getType(a.a)](a);
}