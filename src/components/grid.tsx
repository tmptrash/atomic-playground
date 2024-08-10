import React from 'react'
import { Line, Rect } from 'react-konva'


import Config from '../config';
import { arr } from '../utils/utils';

export default function Grid() {
  const grid = Config.grid;
  const stepSize = grid.stepSize;
  const xSize = grid.cols * grid.stepSize;
  const ySize = grid.rows * grid.stepSize;
  const halfBorder = -grid.borderWidth / 2;

  return (
    <>
      {/* Outer border */}
      <Rect
        x={halfBorder}
        y={halfBorder}
        width={xSize - halfBorder * 2}
        height={ySize - halfBorder * 2}
        strokeWidth={grid.borderWidth}
        stroke={grid.fillColor}/>
      {/* Background color with opacity */}
      <Rect
        x={0}
        y={0}
        width={xSize}
        height={ySize}
        fill={grid.fillColor}
        opacity={grid.fillOpacity}/>
      {/* Grid vertical lines */}
      {arr(grid.cols + 1).map((_, i) =>
        <Line
          key={i}
          x={i * stepSize}
          points={[0,0,0,ySize]}
          stroke={grid.linesColor}
          strokeWidth={grid.lineWidth}/>
      )}
      {/* Grid horizontal lines */}
      {arr(grid.rows + 1).map((_, i) =>
        <Line
          key={i}
          y={i * stepSize}
          points={[0,0,xSize,0]}
          stroke={grid.linesColor}
          strokeWidth={grid.lineWidth}
        />
      )}
    </>
  )
}