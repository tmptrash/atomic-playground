import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Vector2d } from "konva/lib/types";
import Config from "../config";
import Lines from './liness';

export default class Grid {
  layer: Konva.Layer;
  private scale = 1;
  private stage: Konva.Stage;
  private lines: Lines;
  private onResizeCb;
  private onAfterRender: () => void;

  constructor(onAfterRender: () => void) {
    const query = Config.grid.query;
    const canvasEl = document.querySelector('#' + query) as HTMLElement;
    this.onAfterRender = onAfterRender;
    this.stage = new Konva.Stage({
      container: query,
      draggable: true,
      x: Config.grid.borderWidth,
      y: Config.grid.borderWidth,
      width: canvasEl.clientWidth,
      height: canvasEl.clientHeight
    });
    this.lines = new Lines();
    this.layer = new Konva.Layer({
      draggable: false,
      x: 0,
      y: 0
    });

    this.stage.add(this.layer);
    this.draw(this.layer);

    this.stage.on('wheel', e => this.onWheel(e, this.layer));
    this.stage.on('dragend', () => this.draw(this.layer));
    window.addEventListener('resize', (this.onResizeCb = () => this.onResize()));
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
    this.onAfterRender();
  }

  private onResize() {
    const canvasEl = document.querySelector('#' + Config.grid.query) as HTMLElement;

    this.stage.width(canvasEl.clientWidth * this.scale);
    this.stage.height(canvasEl.clientHeight * this.scale);
  }

  private onWheel(e: KonvaEventObject<WheelEvent>, gridLayer: Konva.Layer) {
    e.evt.preventDefault();

    const pointer = this.stage.getPointerPosition() as Vector2d;
    const toX = (pointer.x - this.stage.x()) / this.scale;
    const toY = (pointer.y - this.stage.y()) / this.scale;
    const minZoom = Config.minZoom;
    const maxZoom = Config.maxZoom;

    // Zoom in or zoom out?
    this.scale += e?.evt?.deltaY > 0 ? Config.zoomStep : -Config.zoomStep;
    if (this.scale < minZoom) { this.scale = minZoom }
    else if (this.scale > maxZoom) { this.scale = maxZoom }

    this.stage.scale({ x: this.scale, y: this.scale });
    this.stage.position({ x: pointer.x - toX * this.scale, y: pointer.y - toY * this.scale });
    this.stage.draw();
    this.draw(gridLayer);
  }
}