import React from 'react';
import Lines from './lines';
import { store } from '../../store/store';
import Atom from '../atom';

export default function Grid() {
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