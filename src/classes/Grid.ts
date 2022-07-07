import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import { GridCfg } from "./GridCfg";
import Lines from './Lines';

export default class Grid {
  cfg: GridCfg;
  layer: Konva.Layer;
  private scale = 1;
  private stage: Konva.Stage;
  private lines: Lines;
  private onResizeCb;

  constructor(cfg: GridCfg) {
    this.cfg = cfg;

    const canvasEl = document.querySelector(this.cfg.query) as HTMLElement;
    this.stage = new Konva.Stage({
      container: this.cfg.query,
      draggable: true,
      x: this.cfg.border,
      y: this.cfg.border,
      width: canvasEl.clientWidth,
      height: canvasEl.clientHeight
    });
    this.lines = new Lines(this.cfg);
    this.layer = new Konva.Layer({
      draggable: false,
      x: 0,
      y: 0
    });

    this.stage.add(this.layer);
    this.draw(this.layer);

    this.stage.on('wheel', e => this.onWheel(e, this.layer));
    this.stage.on('dragend', () => this.draw(this.layer));
    window.addEventListener('resize', (this.onResizeCb = () => this.onResize(this.cfg)));
  }

  destroy() {
    window.removeEventListener('resize', this.onResizeCb);
    this.stage.destroy();
  }

  private draw(gridLayer: Konva.Layer) {
    gridLayer.clear();
    gridLayer.destroyChildren();
    this.lines.drawLines(gridLayer);
    this.lines.drawBorderAndFill(gridLayer);
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
}