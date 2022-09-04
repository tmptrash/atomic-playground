import React from 'react';
import { AtomTypes } from '../../../../enums/enums';
import { Atom } from '../../../../types/atom';
import { BondArrows } from '../../../../types/bonds';
import { getType } from '../../../../utils/atom';
import mov from './mov';

const ATOMS = {
  [AtomTypes.Mov]: mov,
  [AtomTypes.Fix]: drawEmpty,
  [AtomTypes.Spl]: drawEmpty,
  [AtomTypes.If]:  drawEmpty,
  [AtomTypes.Job]: drawEmpty
}

// TODO: will be removed soon
function drawEmpty(a: Atom, arrows: BondArrows) {
  return <></>
}

export function Bonds(a: Atom) {
  const arrows: BondArrows = {
    arrows: [0, 0, 0, 0, 0, 0, 0, 0],
    curArrows: [0, 0, 0, 0, 0, 0, 0, 0]
  };

  return ATOMS[getType(a.a)](a, arrows);
}