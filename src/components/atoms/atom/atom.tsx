import React from 'react';
import { useRef } from 'react';
import { Rect, Text } from "react-konva";
import Config from "../../../config";
import { getType } from '../../../utils/atom';
import { ATOM_COLORS, ATOM_TEXTS } from '../../../types/atom';

type Props = {
  a: number,
  x: number,
  y: number
}
export default function Atom({x, y, a}: Props) {
  const lineWidth = Config.grid.lineWidth;
  const textColor = Config.atoms.textColor;
  const stepSize = Config.grid.stepSize;
  const halfStep = stepSize / 2;
  const type = getType(a);
  const rectRef = useRef(null);
  const textRef = useRef(null);

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
        fill={ATOM_COLORS[type]}/>

      {/* The letter in atom center (m-mov, s-spl,...) */}
      <Text
        ref={textRef}
        x={x + halfStep - 3.7}
        y={y + halfStep - 4}
        text={ATOM_TEXTS[type]}
        fontSize={10}
        fontFamily={'Calibri'}
        fill={textColor}/>
    </>
  )
}