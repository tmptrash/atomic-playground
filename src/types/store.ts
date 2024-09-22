import { AtomTypes, Modes } from "../enums/enums"
import { Atom, Dir } from "./atom"

export type Sandbox = {
  atoms: Atom[]
}
export type Status = {
  mode: Modes,
  atom: AtomTypes,
  dir: Dir
}
export type Store = {
  sandbox: Sandbox,
  status: Status
}

export type Changer = (val: unknown, prop: string) => unknown