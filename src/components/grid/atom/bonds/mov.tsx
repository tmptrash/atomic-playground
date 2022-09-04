import React from 'react';
import { Atom, Dir } from "../../../../types/atom";
import { BondArrows } from "../../../../types/bonds";
import Config from '../../../../config';
import { getMovDir, getVmDir } from "../../../../utils/atom";
import { addBonds, getLinePoints } from "../../../../utils/bonds";
import { Arrow } from 'react-konva';

export default function mov(a: Atom, arrows: BondArrows) {
  const step = Config.grid.stepSize;
  const vmDir = getVmDir(a.a);
  const movDir = getMovDir(a.a);

  addBonds([vmDir, movDir], arrows);

  return (
    <>
      {/* next atom dir for VM */}
      {vmDir !== Dir.no && <Arrow
        points={getLinePoints(a, vmDir, step, arrows)}
        stroke={Config.vm.nextColor}
        strokeWidth={1}
        pointerLength={2}
        pointerWidth={1.5}
      />}

      {/* mov dir */}
      {movDir !== Dir.no && <Arrow
        points={getLinePoints(a, movDir, step, arrows)}
        stroke={Config.atoms.movDirColor}
        strokeWidth={1}
        pointerLength={2}
        pointerWidth={1.5}
      />}
    </>
  )
}