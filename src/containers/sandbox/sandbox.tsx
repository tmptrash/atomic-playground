import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Layer, Stage } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import Config from '../../config';
import Grid from '../../components/grid';
import './sandbox.scss';
import { bind } from '../../store/binder';
import { store } from '../../store/store';
import Atoms from '../../components/atoms/atoms';
import { Modes } from '../../enums/enums';
import { findAtomIdx, getType, nextAtom } from '../../utils/atom';
import { id } from '../../utils/utils';
import { ATOMS } from '../../types/atom';

export default function Sandbox() {
  bind(store.sandbox);

  const atoms = store.sandbox.atoms;
  const [size, setSize] = useState({w: 0, h: 0});
  const [zoom, setZoom] = useState(1);
  const stageRef = useRef(null);
  const modes = {
    [Modes.Clear]: onClear,
    [Modes.Edit]: onEdit,
    [Modes.Add]: onAdd
  }

  function onClear(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y);
    if (atomIndex < 0) { return }
    atoms.splice(atomIndex, 1);
    store.sandbox.atoms = [...atoms];
  }

  function onEdit(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y);
    if (atomIndex < 0) { return }
    const a = atoms[atomIndex];
    atoms[atomIndex] = { id: a.id, x: a.x, y: a.y, a: nextAtom(getType(a.a)) };
    store.sandbox.atoms = [...atoms];
  }

  function onAdd(x: number, y: number) {
    const atomIndex = findAtomIdx(x, y);
    if (atomIndex >= 0) { return }
    store.sandbox.atoms = [...atoms, { id: id(), x, y, a: ATOMS[store.status.atom] }];
  }

  function getRelatedPos(): [number, number] {
    if (stageRef.current === null) { return [-1, -1] }
    const stage = stageRef.current as Konva.Stage;
    const pos = stage.getPointerPosition() as Vector2d;
    return [(pos.x - stage.position().x) / zoom, (pos.y - stage.position().y) / zoom];
  }

  function onResize() {
    const canvasEl = document.querySelector('#' + Config.grid.query) as HTMLElement;
    setSize({
      w: canvasEl.clientWidth,
      h: canvasEl.clientHeight
    });
  }

  function onWheel(e: KonvaEventObject<WheelEvent>) {
    e.evt.preventDefault();
    if (stageRef.current === null) { return }
    const stage = stageRef.current as Konva.Stage;
    const pos = stage.getPointerPosition() as Vector2d;

    // Zoom in or zoom out?
    let scale = e?.evt?.deltaY > 0 ? zoom / Config.zoomDivider : zoom * Config.zoomDivider;
    if (scale < Config.minZoom) { scale = Config.minZoom }
    else if (scale > Config.maxZoom) { scale = Config.maxZoom }

    stage.scale({ x: scale, y: scale });
    stage.position({ x: pos.x - ((pos.x - stage.x()) / zoom) * scale, y: pos.y - ((pos.y - stage.y()) / zoom) * scale });
    setZoom(scale);
  }

  function onMouseup() {
    const [x, y] = getRelatedPos();
    const stepSize = Config.grid.stepSize;
    const [atomX, atomY] = [Math.floor(x / stepSize) * stepSize, Math.floor(y / stepSize) * stepSize];
    if (atomX < 0 || atomY < 0 || atomX >= Config.grid.rows * stepSize || atomY >= Config.grid.cols * stepSize) { return }

    modes[store.status.mode](atomX, atomY);
  }

  useEffect(() => {
    !size.w && onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  })

  return (
    <div id={Config.grid.query} className="sandbox">
      <Stage
        ref={stageRef}
        width={size.w}
        height={size.h}
        draggable={true}
        x={Config.grid.borderWidth}
        y={Config.grid.borderWidth}
        onWheel={onWheel}
        onMouseup={onMouseup}>
        <Layer draggable={false} x={0} y={0}>
          <Grid/>
          <Atoms atoms={atoms}/>
        </Layer>
      </Stage>
    </div>
  )
}
