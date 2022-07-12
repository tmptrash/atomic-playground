import React, { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Config from "../../config";
import Lines from './lines';

export default function Grid() {
  const [size, setSize] = useState({w: 0, h: 0});
  const grid = Config.grid;
  const query = grid.query;

  useEffect(() => {
    const canvasEl = document.querySelector('#' + query) as HTMLElement;
    if (!size.w && !size.h) {
      setSize({w: canvasEl.clientWidth, h: canvasEl.clientHeight});
    }
  })

  return (
    <Stage
      width={size.w}
      height={size.h}
      draggable={true}
      x={grid.borderWidth}
      y={grid.borderWidth}>
      <Layer draggable={false} x={0} y={0}>
        <Lines/>
      </Layer>
    </Stage>
  )
}