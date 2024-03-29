/**
 * Renders all bonds around the atom. We have 8 directions around
 * an atom and two arrow types (Arrow and Sceptre)
 */
import React from 'react';
import { Atom } from '../../../../types/atom';
import { BondData, BondsState } from '../../../../types/bond';
import { id } from '../../../../utils/utils';
import Arrow from './arrows/arrow';
import Sceptre from './arrows/sceptre';

const BONDS = {
  Arrow: (a: Atom, bd: BondData, state: BondsState) => <Arrow key={id()} a={a} {...bd} state={state}/>,
  Sceptre: (a: Atom, bd: BondData, state: BondsState) => <Sceptre key={id()} a={a} {...bd} state={state}/>
};

type Props = {
  a: Atom,
  state: BondsState
}
export function Bonds({a, state}: Props) {
  const arrows: JSX.Element[] = [];
  state.bondDatas.forEach(bdArr => arrows.push(...bdArr.map(bd => BONDS[bd.type](a, bd, state))));

  return (
    <>
      {arrows}
    </>
  );
}