import React from 'react';
import { useRef } from 'react';
import Konva from 'konva';
import { AtomTypes, Modes } from '../../enums/enums';
import { store } from '../../store/store';
import { Rect, Text } from "react-konva";
import Config from "../../config";
import { getType } from '../../utils/atom';
import { ATOM_COLORS, ATOM_TEXTS, DEF_ATOMS } from '../../types/atoms';

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
  const textRef = useRef(null);
  const type = getType(a);
  const halfStep = stepSize / 2;
  const textColor = Config.atoms.textColor;

  function nextDefAtom(type: AtomTypes): number {
    if (++type > AtomTypes.Job) { type = AtomTypes.Mov }
    return DEF_ATOMS[type];
  }

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
      atoms[index] = { id, x: atoms[index].x, y: atoms[index].y, a: nextDefAtom(type) };
      store.sandbox.atoms = [...atoms];
    }
  }

  return (
    <>
      <Rect
        ref={rectRef}
        x={x * stepSize + lineWidth}
        y={y * stepSize + lineWidth}
        width={stepSize - lineWidth * 2}
        height={stepSize - lineWidth * 2}
        strokeWidth={lineWidth}
        stroke={ATOM_COLORS[type]}
        fill={ATOM_COLORS[type]}
        onMouseup={onMouseup}/>
      <Text
        ref={textRef}
        x={x * stepSize + halfStep - 3.7}
        y={y * stepSize + halfStep - 4}
        text={ATOM_TEXTS[type]}
        fontSize={10}
        fontFamily={'Calibri'}
        fill={textColor}
        onMouseup={onMouseup}
      />
    </>
  )
}