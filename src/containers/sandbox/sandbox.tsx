import React, { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { Layer, Stage } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import Config from '../../config';
import Grid from '../../components/grid/grid';
import './sandbox.scss';

export default function Sandbox() {
  const [size, setSize] = useState({w: 0, h: 0});
  const [zoom, setZoom] = useState(1);
  const grid = Config.grid;
  const query = grid.query;
  const stageRef = useRef(null);

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
    const pointer = stage.getPointerPosition() as Vector2d;
    const toX = (pointer.x - stage.x()) / zoom;
    const toY = (pointer.y - stage.y()) / zoom;

    // Zoom in or zoom out?
    let newScale = e?.evt?.deltaY > 0 ? zoom / Config.zoomDivider : zoom * Config.zoomDivider;
    if (newScale < Config.minZoom) { newScale = Config.minZoom }
    else if (newScale > Config.maxZoom) { newScale = Config.maxZoom }

    stage.scale({ x: newScale, y: newScale });
    stage.position({ x: pointer.x - toX * newScale, y: pointer.y - toY * newScale });
    setZoom(newScale);
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
