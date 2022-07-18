import React from 'react';
import { Line, Rect } from 'react-konva';
import Config from "../../config";
import { arr } from '../../utils/utils';

export default function Lines() {
  const grid = Config.grid;
  const stepSize = grid.stepSize;
  const xSize = grid.cols * grid.stepSize;
  const ySize = grid.rows * grid.stepSize;
  const borderPos = -grid.borderWidth / 2;

  return (
    <>
      <Rect
        x={borderPos}
        y={borderPos}
        width={xSize}
        height={ySize}
        strokeWidth={grid.borderWidth}
        stroke={grid.fillColor}/>
      <Rect
        x={borderPos}
        y={borderPos}
        width={xSize}
        height={ySize}
        fill={grid.fillColor}
        opacity={grid.fillOpacity}/>
      {arr(grid.cols).map((_, i) => 
        <Line
          key={i}
          x={i * stepSize}
          points={[0,0,0,ySize]}
          stroke={grid.linesColor}
          strokeWidth={grid.lineWidth}/>
      )}
      {arr(grid.rows).map((_, i) =>
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