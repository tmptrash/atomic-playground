/**
 * JSON related interfaces
 */
export interface IAtom {
  a: number,
  x: number,
  y: number
}
export interface IVm {
  x: number,
  y: number,
  e: number
}
export interface IBlock {
  atoms: IAtom[],
  vms: IVm[]
}
export interface IJson {
  width: number,
  height: number,
  blocks: IBlock[]
}