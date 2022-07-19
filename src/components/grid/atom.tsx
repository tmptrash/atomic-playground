import React from 'react';
import { useRef } from 'react';
import Konva from 'konva';
import { AtomTypes, Modes } from '../../enums/enums';
import { store } from '../../store/store';
import { Rect } from "react-konva";
import Config from "../../config";
import { getType } from '../../utils/atom';

const ATOM_COLORS = {
  [AtomTypes.Mov]: Config.atoms.movColor,
  [AtomTypes.Fix]: Config.atoms.fixColor,
  [AtomTypes.Spl]: Config.atoms.splColor,
  [AtomTypes.If] : Config.atoms.ifColor,
  [AtomTypes.Job]: Config.atoms.jobColor
}

type Props = {
  id: string,
  x: number,
  y: number,
  a: number
}
export default function Atom(props: Props) {
  const {x, y, a, id} = props;
  const lineWidth = Config.grid.lineWidth;
  const stepSize = Config.grid.stepSize;
  const rectRef = useRef(null);
  const type = getType(a);

  function onMouseup() {
    if (store.status.mode === Modes.Clear) {
      if (rectRef.current === null) { return }
      (rectRef.current as Konva.Rect).destroy();
      const atoms = store.sandbox.atoms;
      atoms.splice(atoms.findIndex(a => a.id === id), 1);
      store.sandbox.atoms = [...atoms];
    }
  }

  return (
    <Rect
      ref={rectRef}
      x={x * stepSize + lineWidth}
      y={y * stepSize + lineWidth}
      width={stepSize - lineWidth * 2}
      height={stepSize - lineWidth * 2}
      strokeWidth={lineWidth}
      stroke={ATOM_COLORS[type]}
      fill={ATOM_COLORS[type]}
      onMouseup={onMouseup}
    />
  )
}