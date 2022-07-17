import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Layer, Stage } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import Config from '../../config';
import { bind } from '../../store/binder';
import { store } from '../../store/store';
import Grid from '../../components/grid/grid';
import './sandbox.scss';

export default function Sandbox() {
  bind(store.status);

  const [size, setSize] = useState({w: 0, h: 0});
  const grid = Config.grid;
  const query = grid.query;
  const stageRef = useRef(null);
  let scale = 1;

  function onResize() {
    const canvasEl = document.querySelector('#' + Config.grid.query) as HTMLElement;
    setSize({
      w: canvasEl.clientWidth * scale,
      h: canvasEl.clientHeight * scale
    });
  }

  function onWheel(e: KonvaEventObject<WheelEvent>) {
    e.evt.preventDefault();
    if (stageRef.current === null) { return }
    const stage = stageRef.current as Konva.Stage;
    const pointer = stage.getPointerPosition() as Vector2d;
    const toX = (pointer.x - stage.x()) / scale;
    const toY = (pointer.y - stage.y()) / scale;

    // Zoom in or zoom out?
    scale = e?.evt?.deltaY > 0 ? scale / Config.zoomDivider : scale * Config.zoomDivider;
    if (scale < Config.minZoom) { scale = Config.minZoom }
    else if (scale > Config.maxZoom) { scale = Config.maxZoom }

    stage.scale({ x: scale, y: scale });
    stage.position({ x: pointer.x - toX * scale, y: pointer.y - toY * scale });
  }

  function onDestroy() {
    window.removeEventListener('resize', onResize);
  }

  useEffect(() => {
    const canvasEl = document.querySelector('#' + query) as HTMLElement;
    !size.w && setSize({w: canvasEl.clientWidth, h: canvasEl.clientHeight});
    window.addEventListener('resize', onResize);
    return onDestroy;
  })
  
  return (
    <div id={Config.grid.query} className="sandbox">
      <Stage
        ref={stageRef}
        width={size.w}
        height={size.h}
        draggable={true}
        x={grid.borderWidth}
        y={grid.borderWidth}
        onWheel={onWheel}>
        <Layer draggable={false} x={0} y={0}>
          <Grid/>
        </Layer>
      </Stage>
    </div>
  )
}
