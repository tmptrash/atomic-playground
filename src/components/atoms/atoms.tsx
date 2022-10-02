import React from 'react';
import { Atom as AtomType } from '../../types/atom';
import { BondData, BondsState } from '../../types/bond';
import { getType } from '../../utils/atom';
import Atom from './atom/atom';
import { ATOM_BONDS } from './atom/bonds/analyzer';
import { Bonds } from './atom/bonds/bonds';

type Props = {
  atoms: AtomType[];
}
export default function Atoms({ atoms }: Props) {
  const zeros = Array(8).fill(0);
  const states = atoms.map(atom => ({
    atom,
    bonds: [...zeros],
    curBonds: [...zeros],
    bondDatas: zeros.map(() => []) as BondData[][]
  })) as BondsState[];
  //
  // It's important to split creation of bonds, running atoms callbacks and drawing them
  //
  atoms.forEach((a, i) => ATOM_BONDS[getType(a.a)](a, states[i], states));

  return (
    <>
      {atoms.map(a => <Atom key={a.id} {...a}/>)}
      {atoms.map((a, i) => <Bonds key={i} a={a} state={states[i]}/>)}
    </>
  )
}