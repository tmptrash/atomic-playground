import { Modes } from "../enums/enums"
import { Atom } from "./atom"

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