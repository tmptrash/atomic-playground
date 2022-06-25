import React from 'react';
import { Stage, Layer, Star } from 'react-konva';

function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Star
          key={0}
          x={100}
          y={100}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          fill="#89b717"
          opacity={0.8}
          draggable
        ></Star>
      </Layer>
    </Stage>
  );
}

export default App;
