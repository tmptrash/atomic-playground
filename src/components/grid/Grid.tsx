import React from 'react';
import { useEffect } from "react";
import './Grid.scss';
import Gridd from './Gridd';

type Props = {
  rows: number,
  cols: number
}

export default function Grid({rows = 10, cols = 10}: Props) {
  let grid: Gridd;

  useEffect(() => {
    grid = new Gridd(rows, cols, '#canvas');
  });

  return <div id="canvas" className="grid"/>
}
