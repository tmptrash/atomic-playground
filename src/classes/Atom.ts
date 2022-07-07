import Konva from "konva";
import { AtomType } from "../enums/enums";
import theme from "../theme";

const ATOM_COLORS = {
  [AtomType.MOV]: theme.atoms.movColor,
  [AtomType.FIX]: theme.atoms.fixColor,
  [AtomType.SPL]: theme.atoms.splColor,
  [AtomType.IF] : theme.atoms.ifColor,
  [AtomType.JOB]: theme.atoms.jobColor
}

export default class Atom {
  private layer: Konva.Layer;
  private x: number;
  private y: number;
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
    this.layer.add(new Konva.Rect({
      x: -2,
      y: -2,
      width: this.size,
      height: this.size,
      strokeWidth: 4,
      stroke: ATOM_COLORS[this.type],
      fill: ATOM_COLORS[this.type]
    }));
  }
}