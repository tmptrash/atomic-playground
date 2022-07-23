import React from 'react';
import Lines from './lines';
import { store } from '../../store/store';
import Atom from './atom/atom';
import { bind } from '../../store/binder';

export default function Grid() {
  bind(store.sandbox);

  return (
    <>
      <Lines/>
      {store.sandbox.atoms.map(a => <Atom key={a.id} {...a}/>)}
    </>
  )
}