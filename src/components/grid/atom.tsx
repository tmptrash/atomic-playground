import React from 'react';
import { useRef } from 'react';
import Konva from 'konva';
import { Rect, Text, Line } from "react-konva";
import { Modes } from '../../enums/enums';
import { store } from '../../store/store';
import Config from "../../config";
import { getLine, getType, nextDef } from '../../utils/atom';
import { Atom as Props, ATOM_COLORS, ATOM_TEXTS, Dir } from '../../types/atom';

export default function Atom(props: Props) {
  const {x, y, a, id} = props;
  const lineWidth = Config.grid.lineWidth;
  const stepSize = Config.grid.stepSize;
  const halfStep = stepSize / 2;
  const type = getType(a);
  const rectRef = useRef(null);
  const textRef = useRef(null);
  const nextColor = Config.atoms.nextColor;
  const textColor = Config.atoms.textColor;

  // TODO: refactor this
  function onMouseup() {
    if (store.status.mode === Modes.Clear) {
      if (rectRef.current === null || textRef.current === null) { return }
      (rectRef.current as Konva.Rect).destroy();
      (textRef.current as Konva.Text).destroy();
      const atoms = store.sandbox.atoms;
      atoms.splice(atoms.findIndex(a => a.id === id), 1);
      store.sandbox.atoms = [...atoms];
    } else if (store.status.mode === Modes.Edit) {
      if (rectRef.current === null || textRef.current === null) { return }
      const atoms = store.sandbox.atoms;
      const index = atoms.findIndex(a => a.id === id);
      if (index < 0) { return }
      atoms[index] = { id, x: atoms[index].x, y: atoms[index].y, a: nextDef(type) };
      store.sandbox.atoms = [...atoms];
    }
  }

  return (
    <>
      <Rect
        ref={rectRef}
        x={x + lineWidth}
        y={y + lineWidth}
        width={stepSize - lineWidth * 2}
        height={stepSize - lineWidth * 2}
        strokeWidth={lineWidth}
        stroke={ATOM_COLORS[type]}
        fill={ATOM_COLORS[type]}
        onMouseup={onMouseup}/>
      <Text
        ref={textRef}
        x={x + halfStep - 3.7}
        y={y + halfStep - 4}
        text={ATOM_TEXTS[type]}
        fontSize={10}
        fontFamily={'Calibri'}
        fill={textColor}
        onMouseup={onMouseup}
      />
      {getLine(props, 1)}
    </>
  )
}