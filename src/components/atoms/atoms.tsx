/**
 * Renders all atoms and inner bonds. Atom is just a colored square
 * with a letter in the center. Bonds are colored arrows  of two types.
 * This component uses clever approach of analyzing all bonds positions first
 * and after that atoms will be rendered first and the bonds above them.
 * We need such analysis because bonds are located not only around an atom,
 * but also around near atoms.
 */
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import React, { useEffect } from 'react';
import Config from '../../config';
import { Modes } from '../../enums/enums';
import { store } from '../../store/store';
import { ATOMS } from '../../types/atom';
import { BondData, BondsState } from '../../types/bond';
import { findAtomIdx, getType, nextAtom } from '../../utils/atom';
import { id } from '../../utils/utils';
import Atom from './atom/atom';
import { ATOM_BONDS } from './atom/bonds/analyzer';
import { Bonds } from './atom/bonds/bonds';

type Props = {
  stage: Konva.Stage | null,
  zoom: number
}
export default function Atoms({ stage, zoom }: Props) {
  const zeros = Array(8).fill(0);
  const states = store.sandbox.atoms.map(atom => ({ atom, bonds: [...zeros], curBonds: [...zeros], bondDatas: zeros.map(() => []) as BondData[][] })) as BondsState[];
  const modes = {
    [Modes.Clear]: onClear,
    [Modes.Edit]: onEdit,
    [Modes.Add]: onAdd
  }
  //
  // It's important to split creation of bonds, running atoms callbacks and drawing them
  //
  store.sandbox.atoms.forEach((a, i) => ATOM_BONDS[getType(a.a)](a, states[i], states));

  function onClear(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y);
    if (atomIndex < 0) { return }
    const atoms = store.sandbox.atoms;
    atoms.splice(atomIndex, 1);
    store.sandbox.atoms = [...atoms];
  }

  function onEdit(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y);
    if (atomIndex < 0) { return }
    const atoms = store.sandbox.atoms;
    const a = atoms[atomIndex];
    atoms[atomIndex] = { id: a.id, x: a.x, y: a.y, a: nextAtom(getType(a.a)) };
    store.sandbox.atoms = [...atoms];
  }

  function onAdd(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y);
    if (atomIndex >= 0) { return }
    store.sandbox.atoms = [...store.sandbox.atoms, { id: id(), x, y, a: ATOMS[store.status.atom] }];
  }

  function getRelatedPos(): [number, number] {
    if (stage === null) { return [-1, -1] }
    const pos = stage.getPointerPosition() as Vector2d;
    return [(pos.x - stage.position().x) / zoom, (pos.y - stage.position().y) / zoom];
  }

  function onMouseup() {
    const [x, y] = getRelatedPos();
    const step = Config.grid.stepSize;
    const [ax, ay] = [Math.floor(x / step) * step, Math.floor(y / step) * step];
    if (ax < 0 || ay < 0 || ax >= Config.grid.rows * step || ay >= Config.grid.cols * step) { return }
    modes[store.status.mode](ax, ay);
  }

  useEffect(() => {
    stage && stage.on('mouseup', onMouseup);
    return () => {stage && stage.off('mouseup', onMouseup)}
  })

  return (
    <>
      {store.sandbox.atoms.map(a => <Atom key={a.id} {...a}/>)}
      {store.sandbox.atoms.map((a, i) => <Bonds key={a.id} a={a} state={states[i]}/>)}
    </>
  )
}