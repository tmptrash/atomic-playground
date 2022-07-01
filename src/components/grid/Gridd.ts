import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import theme from './../../theme';

const SCALES = [5,4,3,2.5,2,1.5,1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05];
const STEP_SIZE = 40;

class Gridd {
  private cols: number;
  private rows: number;
  private stage: Konva.Stage;
  private gridLayer: Konva.Layer;
  private scale: number;

  constructor(rows: number, cols: number, query: string) {
    const canvasEl = document.getElementById('canvas') as HTMLElement;

    this.rows = rows;
    this.cols = cols;
    this.stage = new Konva.Stage({
      container: query,
      draggable: true,
      x: 4,
      y: 4,
      width: canvasEl.clientWidth,
      height: canvasEl.clientHeight
    });
    this.gridLayer = new Konva.Layer({
      draggable: false,
      x: 0,
      y: 0
    });

    this.stage.add(this.gridLayer);

    this.drawLines();

    this.scale = 6;

    this.stage.on('wheel', e => this.onWheel(e));
    this.stage.on('dragend', () => this.drawLines());
  }

  onWheel(e: KonvaEventObject<WheelEvent>) {
    // stop default scrolling
    e.evt.preventDefault();

    const oldScale = this.stage.scaleX();
    const pointer = this.stage.getPointerPosition() as Vector2d;
    
    const mousePointTo = {
      x: (pointer.x - this.stage.x()) / oldScale,
      y: (pointer.y - this.stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    if (direction > 0){
      this.scale = this.scale > 0 ? this.scale - 1 : this.scale;
    }
    else {
      this.scale = this.scale < SCALES.length - 1 ? this.scale + 1 : this.scale;
    }
    
    const newScale = SCALES[this.scale];

    this.stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    this.stage.position(newPos);

    
    // $('#scaleDisplay').html(stage.scaleX());
    
    this.stage.draw();
    this.drawLines();
  }

  drawLines() {
    this.gridLayer.clear();
    this.gridLayer.destroyChildren();
    
    const xSize = this.cols * STEP_SIZE;
    const ySize = this.rows * STEP_SIZE;

    // draw vertical lines
    for (let i = 0; i <= this.cols; i++) {
      this.gridLayer.add(
        new Konva.Line({
          x: i * STEP_SIZE,
          points: [0, 0, 0, ySize],
          stroke: theme.gridColor,
          strokeWidth: .1
        })
      );
    }
    //draw Horizontal lines
    for (let i = 0; i <= this.rows; i++) {
      this.gridLayer.add(
        new Konva.Line({
          y: i * STEP_SIZE,
          points: [0, 0, xSize, 0],
          stroke: theme.gridColor,
          strokeWidth: .1
        })
      );
    }
    
    const rStageBorder = new Konva.Rect({
      x: -2,
      y: -2,
      width: xSize,
      height: ySize,
      strokeWidth: 4,
      stroke: theme.gridBack
    });
    const rStageFill = new Konva.Rect({
      x: -2,
      y: -2,
      width: xSize,
      height: ySize,
      fill: theme.gridBack,
      opacity: 0.15
    });
    
    this.gridLayer.add(rStageFill, rStageBorder); 

    this.gridLayer.batchDraw();
  }
}

export default Gridd;