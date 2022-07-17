/**
 * JSON related interfaces
 */
export type Atom = {
  a: number,
  x: number,
  y: number
}
export type Vm = {
  x: number,
  y: number,
  e: number
}
export type Block = {
  atoms: Atom[],
  vms: Vm[]
}
export type Json = {
  width: number,
  height: number,
  blocks: Block[]
}