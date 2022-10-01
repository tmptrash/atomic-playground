import React from 'react';
import { useRef } from 'react';
import Konva from 'konva';
import { Rect, Text } from "react-konva";
import { Modes } from '../../../enums/enums';
import { store } from '../../../store/store';
import Config from "../../../config";
import { getType, nextAtom } from '../../../utils/atom';
import { ATOM_COLORS, ATOM_TEXTS } from '../../../types/atom';
import { Atom as AtomType } from '../../../types/atom';

type Props = {
  id: string,
  a: number,
  x: number,
  y: number
}
export default function Atom({x, y, a, id}: Props) {
  const lineWidth = Config.grid.lineWidth;
  const textColor = Config.atoms.textColor;
  const stepSize = Config.grid.stepSize;
  const halfStep = stepSize / 2;
  const type = getType(a);
  const rectRef = useRef(null);
  const textRef = useRef(null);

  function findAtom(found: (atomIndex: number, atoms: AtomType[]) => void) {
    if (rectRef.current === null || textRef.current === null) { return }
    const atomIndex = store.sandbox.atoms.findIndex(a => a.id === id);
    atomIndex !== -1 && found(atomIndex, store.sandbox.atoms);
  }

  function onMouseup() {
    if (store.status.mode === Modes.Clear) {
      findAtom((atomIndex, atoms) => {
        rectRef.current && (rectRef.current as Konva.Rect).destroy();
        textRef.current && (textRef.current as Konva.Text).destroy();
        atoms.splice(atomIndex, 1);
        store.sandbox.atoms = [...atoms];
      });
    } else if (store.status.mode === Modes.Edit) {
      findAtom((atomIndex, atoms) => {
        atoms[atomIndex] = { id, x: atoms[atomIndex].x, y: atoms[atomIndex].y, a: nextAtom(type) };
        store.sandbox.atoms = [...atoms];
      });
    }
  }

  return (
    <>
      {/* Atom rect */}
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

      {/* The letter in atom center (m-mov, s-spl,...) */}
      <Text
        ref={textRef}
        x={x + halfStep - 3.7}
        y={y + halfStep - 4}
        text={ATOM_TEXTS[type]}
        fontSize={10}
        fontFamily={'Calibri'}
        fill={textColor}
        onMouseup={onMouseup}/>
    </>
  )
}