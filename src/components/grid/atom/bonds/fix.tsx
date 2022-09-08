import React from 'react';
import { Atom } from "../../../../types/atom";
import { BondArrows } from "../../../../types/bonds";
import Config from '../../../../config';
import { getBond1Dir, getVmDir } from "../../../../utils/atom";
import { addBonds } from "../../../../utils/bonds";
import Arrow from './arrows/arrow';
import Sceptre from './arrows/sceptre';

type Props = {
  a: Atom,
  arrows: BondArrows
}
export default function Fix({a, arrows}: Props) {
  const vmDir = getVmDir(a.a);
  const bond1Dir = getBond1Dir(a.a);

  addBonds([vmDir, bond1Dir], arrows);

  return (
    <>
      {/* next atom dir for VM */}
      <Arrow a={a} dir={vmDir} color={Config.vm.nextColor} arrows={arrows}/>
      {/* bond1 dir */}
      <Sceptre a={a} dir={bond1Dir} color={Config.bonds.bond1Color} arrows={arrows}/>
      {/* TODO: add bond2!!! */}
    </>
  )
}