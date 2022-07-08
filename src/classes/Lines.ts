import Konva from "konva";
import Config from '../config';

export default class Lines {
  drawLines(gridLayer: Konva.Layer) {
    const stepSize = Config.grid.stepSize;
    const cols = Config.grid.cols;
    const rows = Config.grid.rows;
    const xSize = Config.grid.cols * stepSize;
    const ySize = Config.grid.rows * stepSize;

    // draw vertical lines
    for (let i = 0; i <= cols; i++) {
      gridLayer.add(
        new Konva.Line({
          x: i * stepSize,
          points: [0, 0, 0, ySize],
          stroke: Config.grid.linesColor,
          strokeWidth: Config.grid.lineWidth
        })
      );
    }
    //draw Horizontal lines
    for (let i = 0; i <= rows; i++) {
      gridLayer.add(
        new Konva.Line({
          y: i * stepSize,
          points: [0, 0, xSize, 0],
          stroke: Config.grid.linesColor,
          strokeWidth: Config.grid.lineWidth
        })
      );
    }
  }

  drawBorderAndFill(gridLayer: Konva.Layer) {
    const xSize = Config.grid.cols * Config.grid.stepSize;
    const ySize = Config.grid.rows * Config.grid.stepSize;
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