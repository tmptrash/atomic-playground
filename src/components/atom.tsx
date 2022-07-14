import React from 'react';
import { useRef } from 'react';
import Konva from 'konva';
import { AtomTypes, Modes } from '../enums/enums';
import { Store } from '../store';
import { Rect } from "react-konva";
import Config from "../config";

const ATOM_COLORS = {
  [AtomTypes.Mov]: Config.atoms.movColor,
  [AtomTypes.Fix]: Config.atoms.fixColor,
  [AtomTypes.Spl]: Config.atoms.splColor,
  [AtomTypes.If] : Config.atoms.ifColor,
  [AtomTypes.Job]: Config.atoms.jobColor
}

type Props = {
  x: number,
  y: number,
  size: number,
  type: AtomTypes
}
export default function Atom(props: Props) {
  const {x, y, size, type} = props;
  const lineWidth = + Config.grid.lineWidth;
  const rectRef = useRef(null);

  function onMouseup() {
    if (Store.sandbox.mode === Modes.Clear) {
      if (rectRef.current === null) { return }
      (rectRef.current as Konva.Rect).destroy();
    }
  }

  return (
    <Rect
      ref={rectRef}
      x={x + lineWidth}
      y={y + lineWidth}
      width={size - lineWidth * 2}
      height={size - lineWidth * 2}
      strokeWidth={lineWidth}
      stroke={ATOM_COLORS[type]}
      fill={ATOM_COLORS[type]}
      onMouseup={onMouseup}
    />
  )
}