import React from 'react';
import Lines from './lines';
import { store } from '../../store/store';
import Atom from './atom/atom';
import { bind } from '../../store/binder';
import { Bonds } from './atom/bonds/bonds';

export default function Grid() {
  bind(store.sandbox);

  const atoms = store.sandbox.atoms;

  return (
    <>
      <Lines/>
      {atoms.map(a => <Atom key={a.id} {...a}/>)}
      {atoms.map(a => <Bonds key={a.id} {...a}/>)}
    </>
  )
}