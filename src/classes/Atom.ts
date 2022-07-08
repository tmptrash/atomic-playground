import Konva from "konva";
import { AtomType } from "../enums/enums";
import Config from "../config";

const ATOM_COLORS = {
  [AtomType.MOV]: Config.atoms.movColor,
  [AtomType.FIX]: Config.atoms.fixColor,
  [AtomType.SPL]: Config.atoms.splColor,
  [AtomType.IF] : Config.atoms.ifColor,
  [AtomType.JOB]: Config.atoms.jobColor
}

export default class Atom {
  x: number;
  y: number;
  private layer: Konva.Layer;
  private size: number;
  private type: AtomType;

  constructor(layer: Konva.Layer, x: number, y: number, size: number, type: AtomType) {
    this.layer = layer;
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }

  draw() {
    const lineWidth = + Config.grid.lineWidth;
    this.layer.add(new Konva.Rect({
      x: this.x + lineWidth,
      y: this.y + lineWidth,
      width: this.size - lineWidth * 2,
      height: this.size - lineWidth * 2,
      strokeWidth: lineWidth,
      stroke: ATOM_COLORS[this.type],
      fill: ATOM_COLORS[this.type]
    }));
  }
}