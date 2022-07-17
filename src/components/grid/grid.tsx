import React from 'react';
import Lines from './lines';
import { store } from '../../store/store';
import Atom from '../atom';
import { bind } from '../../store/binder';

export default function Grid() {
  bind(store.sandbox);

  const atoms = store.sandbox.atoms;
  console.log(atoms);
  return (
    <>
      <Lines/>
      {store.sandbox.atoms.map(a => (
        <Atom
          key={a.id}
          id={a.id}
          x={a.x}
          y={a.y}
          size={a.size}
          type={a.type}
        />
      ))}
    </>
  )
}