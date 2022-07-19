import { Modes } from "../enums/enums"

export type Atom = {
  id: string,
  x: number,
  y: number,
  a: number
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