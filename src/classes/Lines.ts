import Konva from "konva";
import { GridCfg } from "./GridCfg";
import theme from './../theme';

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

  drawBorderAndFill(gridLayer: Konva.Layer) {
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