import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import theme from '../../theme';
import { GridCfg, GridCfgDef } from "./GridCfg";

export default class Grid {
  private cfg: GridCfg;
  private scale = 1;
  private stage: Konva.Stage;
  private onResizeCb;

  constructor(cfg: GridCfg) {
    this.cfg = {...GridCfgDef, ...cfg}

    const canvasEl = document.querySelector(cfg.query) as HTMLElement;
    this.stage = new Konva.Stage({
      container: cfg.query,
      draggable: true,
      x: cfg.border,
      y: cfg.border,
      width: canvasEl.clientWidth,
      height: canvasEl.clientHeight
    });
    const gridLayer = new Konva.Layer({
      draggable: false,
      x: 0,
      y: 0
    });

    this.stage.add(gridLayer);
    this.draw(gridLayer);

    this.stage.on('wheel', e => this.onWheel(e, gridLayer));
    this.stage.on('dragend', () => this.draw(gridLayer));
    window.addEventListener('resize', (this.onResizeCb = () => this.onResize(cfg)));
  }

  destroy() {
    window.removeEventListener('resize', this.onResizeCb);
    this.stage.destroy();
  }

  private onResize(cfg: GridCfg) {
    const canvasEl = document.querySelector(cfg.query) as HTMLElement;

    this.stage.width(canvasEl.clientWidth * this.scale);
    this.stage.height(canvasEl.clientHeight * this.scale);
  }

  private onWheel(e: KonvaEventObject<WheelEvent>, gridLayer: Konva.Layer) {
    e.evt.preventDefault();

    const pointer = this.stage.getPointerPosition() as Vector2d;
    const toX = (pointer.x - this.stage.x()) / this.scale;
    const toY = (pointer.y - this.stage.y()) / this.scale;

    // Zoom in or zoom out?
    this.scale += e?.evt?.deltaY > 0 ? this.cfg.scaleSpeed : -this.cfg.scaleSpeed;
    if (this.scale < .1) { this .scale = .1 }
    else if (this.scale > 10) { this.scale = 10 }

    this.stage.scale({ x: this.scale, y: this.scale });
    this.stage.position({ x: pointer.x - toX * this.scale, y: pointer.y - toY * this.scale });
    this.stage.draw();
    this.draw(gridLayer);
  }

  private draw(gridLayer: Konva.Layer) {
    gridLayer.clear();
    gridLayer.destroyChildren();
    this.drawLines(gridLayer);
    this.drawBorderAndFill(gridLayer);
  }

  private drawLines(gridLayer: Konva.Layer) {
    const xSize = this.cfg.cols * this.cfg.stepSize;
    const ySize = this.cfg.rows * this.cfg.stepSize;

    // draw vertical lines
    for (let i = 0; i <= this.cfg.cols; i++) {
      gridLayer.add(
        new Konva.Line({
          x: i * this.cfg.stepSize,
          points: [0, 0, 0, ySize],
          stroke: theme.gridColor,
          strokeWidth: .1
        })
      );
    }
    //draw Horizontal lines
    for (let i = 0; i <= this.cfg.rows; i++) {
      gridLayer.add(
        new Konva.Line({
          y: i * this.cfg.stepSize,
          points: [0, 0, xSize, 0],
          stroke: theme.gridColor,
          strokeWidth: .1
        })
      );
    }
  }

  private drawBorderAndFill(gridLayer: Konva.Layer) {
    const xSize = this.cfg.cols * this.cfg.stepSize;
    const ySize = this.cfg.rows * this.cfg.stepSize;
    const rGridBorder = new Konva.Rect({
      x: -2,
      y: -2,
      width: xSize,
      height: ySize,
      strokeWidth: 4,
      stroke: theme.gridBack
    });
    const rGridFill = new Konva.Rect({
      x: -2,
      y: -2,
      width: xSize,
      height: ySize,
      fill: theme.gridBack,
      opacity: 0.15
    });
    
    gridLayer.add(rGridFill, rGridBorder); 
  }
}