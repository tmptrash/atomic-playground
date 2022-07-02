import React from 'react';
import { useEffect } from "react";
import './Sandbox.scss';
import Grid from './Grid';

const CANVAS_QUERY = 'canvas';

type Props = {
  rows: number,
  cols: number
}

export default function Sandbox({rows = 10, cols = 10}: Props) {
  let grid: Grid;

  useEffect(() => {
    grid = new Grid(rows, cols, '#' + CANVAS_QUERY);
  });

  return <div id={CANVAS_QUERY} className="grid"/>
}
