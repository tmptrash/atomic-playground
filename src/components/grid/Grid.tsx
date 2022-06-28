import Konva from "konva";
import { Vector2d } from "konva/lib/types";
import { useEffect } from "react";
import './Grid.scss';
import theme from './../../theme';

const STEP_SIZE = 40;

export default function Grid({rows = 10, cols = 10}) {
  // function unScale(stage: Konva.Stage, val: number){
  //   return (val / stage.scaleX());
  // }

  function drawLines(stage: Konva.Stage, gridLayer: Konva.Layer) {
    gridLayer.clear();
    gridLayer.destroyChildren();

    // let stageRect = {
    //   x1: 0, 
    //   y1: 0, 
    //   x2: stage.width(), 
    //   y2: stage.height(),
    //   offset: {
    //     x: unScale(stage, stage.position().x),
    //     y: unScale(stage, stage.position().y),
    //   }
    // };
    // let viewRect = {
    //   x1: -stageRect.offset.x,
    //   y1: -stageRect.offset.y,
    //   x2: unScale(stage, stage.width()) - stageRect.offset.x,
    //   y2: unScale(stage, stage.height()) - stageRect.offset.y
    // };
    // and find the largest rectangle that bounds both the stage and view rect.
      // This is the rect we will draw on.  
      // fullRect = {
      //   x1: Math.min(stageRect.x1, viewRect.x1),
      //   y1: Math.min(stageRect.y1, viewRect.y1),
      //   x2: Math.max(stageRect.x2, viewRect.x2),
      //   y2: Math.max(stageRect.y2, viewRect.y2)          
      // };
      // let gridOffset = {
      //   x: Math.ceil(unScale(stage, stage.position().x) / STEP_SIZE) * STEP_SIZE,
      //   y: Math.ceil(unScale(stage, stage.position().y) / STEP_SIZE) * STEP_SIZE,
      // };
      // let gridRect = {
      //   x1: -gridOffset.x,
      //   y1: -gridOffset.y,
      //   x2: unScale(stage, width) - gridOffset.x + STEP_SIZE,
      //   y2: unScale(stage, height) - gridOffset.y + STEP_SIZE
      // };
      // gridFullRect = {
      //   x1: Math.min(stageRect.x1, gridRect.x1),
      //   y1: Math.min(stageRect.y1, gridRect.y1),
      //   x2: Math.max(stageRect.x2, gridRect.x2),
      //   y2: Math.max(stageRect.y2, gridRect.y2)          
      // };
    
    const xSize = cols * STEP_SIZE;
    const ySize = rows * STEP_SIZE;

    // draw vertical lines
    for (let i = 0; i <= cols; i++) {
      gridLayer.add(
        new Konva.Line({
          x: i * STEP_SIZE,
          points: [0, 0, 0, ySize],
          stroke: theme.gridColor,
          strokeWidth: .1
        })
      );
    }
    //draw Horizontal lines
    for (let i = 0; i <= rows; i++) {
      gridLayer.add(
        new Konva.Line({
          y: i * STEP_SIZE,
          points: [0, 0, xSize, 0],
          stroke: theme.gridColor,
          strokeWidth: .1
        })
      );
    }
    
    let rStageBorder = new Konva.Rect({
      x: -2,
      y: -2,
      width: xSize,
      height: ySize,
      strokeWidth: 4,
      stroke: theme.gridBack
    });
    let rStageFill = new Konva.Rect({
      x: -2,
      y: -2,
      width: xSize,
      height: ySize,
      fill: theme.gridBack,
      opacity: 0.15
    });
    
    gridLayer.add(rStageFill, rStageBorder); 

    gridLayer.batchDraw();
  }

  useEffect(() => {
    let canvasEl = document.getElementById('canvas') as HTMLElement;
    let stage = new Konva.Stage({
      container: '#canvas',
      draggable: true,
      x: 4,
      y: 4,
      width: canvasEl.clientWidth,
      height: canvasEl.clientHeight
    });
    let gridLayer = new Konva.Layer({
      draggable: false,
      x: 0,
      y: 0
    });

    stage.add(gridLayer);

    drawLines(stage, gridLayer);


    let currentScale = 6;
    let scales = [5,4,3,2.5,2,1.5,1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05];

    stage.on('wheel', (e) => {
      // stop default scrolling
      e.evt.preventDefault();

      var oldScale = stage.scaleX();
      var pointer = stage.getPointerPosition() as Vector2d;
      
      var mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY > 0 ? 1 : -1;

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
      if (e.evt.ctrlKey) {
        direction = -direction;
      }

      if (direction > 0){
        currentScale = currentScale > 0 ? currentScale - 1 : currentScale;
      }
      else {
        currentScale = currentScale < scales.length - 1 ? currentScale + 1 : currentScale;
      }
      
      let newScale = scales[currentScale];

      stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      stage.position(newPos);

      
      // $('#scaleDisplay').html(stage.scaleX());
      
      stage.draw();
      drawLines(stage, gridLayer);
    });

    stage.on('dragend', () => drawLines(stage, gridLayer));
  });

  return <div id="canvas" className="grid"/>
}
