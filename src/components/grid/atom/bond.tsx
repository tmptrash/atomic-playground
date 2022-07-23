import React from 'react';
import { Line } from 'react-konva';
import Config from '../../../config';
import { Atom, Dir } from '../../../types/atom';

type Props = {
  atom: Atom,
  dir: Dir
}
export function Bond(props: Props) {
  const { atom } = props;
  const halfStep = Config.grid.stepSize / 2;
  // TODO: implement this
  return (
    <Line
      points={[atom.x - halfStep, atom.y - halfStep, atom.x, atom.y]}
      stroke={Config.atoms.nextColor}
      strokeWidth={1}
    />)
}