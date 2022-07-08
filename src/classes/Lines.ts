import Konva from "konva";
import { GridCfg } from "./GridCfg";
import Config from '../config';

export default class Lines {
  private cfg: GridCfg;

  constructor(cfg: GridCfg) {
    this.cfg = cfg;
  }

  drawLines(gridLayer: Konva.Layer) {
    const xSize = this.cfg.cols * this.cfg.stepSize;
    const ySize = this.cfg.rows * this.cfg.stepSize;

    // draw vertical lines
    for (let i = 0; i <= this.cfg.cols; i++) {
      gridLayer.add(
        new Konva.Line({
          x: i * this.cfg.stepSize,
          points: [0, 0, 0, ySize],
          stroke: Config.grid.linesColor,
          strokeWidth: Config.grid.lineWidth
        })
      );
    }
    //draw Horizontal lines
    for (let i = 0; i <= this.cfg.rows; i++) {
      gridLayer.add(
        new Konva.Line({
          y: i * this.cfg.stepSize,
          points: [0, 0, xSize, 0],
          stroke: Config.grid.linesColor,
          strokeWidth: Config.grid.lineWidth
        })
      );
    }
  }

  drawBorderAndFill(gridLayer: Konva.Layer) {
    const xSize = this.cfg.cols * this.cfg.stepSize;
    const ySize = this.cfg.rows * this.cfg.stepSize;
    const borderPos = -Config.grid.borderWidth / 2;
    const rGridBorder = new Konva.Rect({
      x: borderPos,
      y: borderPos,
      width: xSize,
      height: ySize,
      strokeWidth: Config.grid.borderWidth,
      stroke: Config.grid.fillColor
    });
    const rGridFill = new Konva.Rect({
      x: borderPos,
      y: borderPos,
      width: xSize,
      height: ySize,
      fill: Config.grid.fillColor,
      opacity: Config.grid.fillOpacity
    });
    
    gridLayer.add(rGridFill, rGridBorder); 
  }
}