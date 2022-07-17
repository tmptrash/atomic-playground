import React from 'react';
import './sandbox.scss';
import Config from '../../config';
import { bind } from '../../store/binder';
import { store } from '../../store/store';
import Grid from '../../components/grid/grid';
import { changeAtoms } from '../../store';
import { Changer } from '../../types/store';

export default function Sandbox() {
  bind(store.status);
  bind(store.sandbox, [changeAtoms as Changer]);

  return (
    <div id={Config.grid.query} className="grid">
      <Grid/>
    </div>
  )
}
