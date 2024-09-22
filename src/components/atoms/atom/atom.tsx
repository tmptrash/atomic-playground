import React from 'react'
import { type } from 'irma5/src/atom'
import { Rect, Text } from "react-konva"
import Config from "../../../config"
import { ATOM_COLORS, ATOM_TEXTS, Atom as AtomType } from '../../../types/atom'
import { Bonds } from './bonds/bonds'
// TODO: remove all related structures
// import { store } from '../../../store/store'
// import { ATOM_BONDS } from './bonds/analyzer'
// import { BondData, BondsState } from '../../../types/bond'

type Props = {
  a: AtomType
}
export default function Atom({a}: Props) {
  const lineWidth = Config.grid.lineWidth
  const textColor = Config.atoms.textColor
  const stepSize = Config.grid.stepSize
  const halfStep = stepSize / 2
  const typ = type(a.a)
  //const zeros = Array(8).fill(0)
  //const states = store.sandbox.atoms.map(atom => ({ atom, bonds: [...zeros], curBonds: [...zeros], bondDatas: zeros.map(() => []) as BondData[][] })) as BondsState[]
  //
  // It's important to split creation of bonds, running atoms callbacks and drawing them
  //
  //store.sandbox.atoms.forEach((a, i) => ATOM_BONDS[type(a.a)](a, states[i], states))

  return <>
    {/* Atom rect */}
    <Rect
      x={a.x + lineWidth}
      y={a.y + lineWidth}
      width={stepSize - lineWidth * 2}
      height={stepSize - lineWidth * 2}
      strokeWidth={lineWidth}
      stroke={ATOM_COLORS[typ]}
      fill={ATOM_COLORS[typ]}/>

    {/* The letter in atom center (m-mov, s-spl,...) */}
    <Text
      x={a.x + halfStep - 3.7}
      y={a.y + halfStep - 4}
      text={ATOM_TEXTS[typ]}
      fontSize={10}
      fontFamily={'Calibri'}
      fill={textColor}
    />
    <Bonds atom={a}/>
  </>
}