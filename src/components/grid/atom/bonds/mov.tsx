import React from 'react';
import { Atom } from "../../../../types/atom";
import { BondArrows } from "../../../../types/bonds";
import Config from '../../../../config';
import { getMovDir, getVmDir } from "../../../../utils/atom";
import { addBonds } from "../../../../utils/bonds";
import Arrow from './arrow';

type Props = {
  a: Atom,
  arrows: BondArrows
}
export default function Mov({a, arrows}: Props) {
  const vmDir = getVmDir(a.a);
  const movDir = getMovDir(a.a);

  addBonds([vmDir, movDir], arrows);

  return (
    <>
      {/* next atom dir for VM */}
      <Arrow a={a} dir={vmDir} color={Config.vm.nextColor} arrows={arrows}/>
      {/* mov dir */}
      <Arrow a={a} dir={movDir} color={Config.atoms.movDirColor} arrows={arrows}/>
    </>
  )
}