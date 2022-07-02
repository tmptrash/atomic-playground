export type GridCfg = {
  rows: number,
  cols: number,
  query: string,
  stepSize: number, 
  scaleSpeed: number,
  border: number
}

export const GridCfgDef = {
  rows: 10,
  cols: 10,
  query: '#canvas',
  stepSize: 40,
  scaleSpeed: .1,
  border: 4
}