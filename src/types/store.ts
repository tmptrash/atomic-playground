import { AtomTypes, Modes } from "../enums/enums"

export type Atom = {
  x: number,
  y: number,
  size: number,
  type: AtomTypes
}
export type Sandbox = {
  atoms: Atom[]
}
export type IStatus = {
  mode: Modes
}
export type Store = {
  sandbox: Sandbox,
  status: IStatus
}

export type Changer = (val: unknown, prop: string) => unknown;