import Konva from "konva";
import { AtomTypes, Modes } from "../enums/enums";
import Config from "../config";
import { Store } from '../store';

const ATOM_COLORS = {
  [AtomTypes.Mov]: Config.atoms.movColor,
  [AtomTypes.Fix]: Config.atoms.fixColor,
  [AtomTypes.Spl]: Config.atoms.splColor,
  [AtomTypes.If] : Config.atoms.ifColor,
  [AtomTypes.Job]: Config.atoms.jobColor
}

export default class Atom {
  x: number;
  y: number;
  private layer: Konva.Layer;
  private size: number;
  private type: AtomTypes;

  constructor(layer: Konva.Layer, x: number, y: number, size: number, type: AtomTypes) {
    this.layer = layer;
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }

  draw() {
    const lineWidth = + Config.grid.lineWidth;
    const rect = new Konva.Rect({
      x: this.x + lineWidth,
      y: this.y + lineWidth,
      width: this.size - lineWidth * 2,
      height: this.size - lineWidth * 2,
      strokeWidth: lineWidth,
      stroke: ATOM_COLORS[this.type],
      fill: ATOM_COLORS[this.type]
    });

    rect.on('mouseup', () => {
      if (Store.sandbox.mode === Modes.Clear) {
        rect.destroy();
      }
    });

    this.layer.add(rect);
  }
}