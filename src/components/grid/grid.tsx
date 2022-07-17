import React from 'react';
import Lines from './lines';
import { store } from '../../store/store';
import Atom from '../atom';
import { changeAtoms } from '../../store';
import { Changer } from '../../types/store';
import { bind } from '../../store/binder';

export default function Grid() {
  bind(store.sandbox, [changeAtoms as Changer]);
  
  return (
    <>
      <Lines/>
      {store.sandbox.atoms.map((a, i) => (
        <Atom
          key={i}
          x={a.x}
          y={a.y}
          size={a.size}
          type={a.type}
        />
      ))}
    </>
  )
}