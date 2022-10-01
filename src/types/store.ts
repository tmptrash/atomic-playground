import { Modes } from "../enums/enums"
import { Atom } from "./atom"

export type Sandbox = {
  atoms: Atom[]
}
export type Status = {
  mode: Modes
}
export type Store = {
  sandbox: Sandbox,
  status: Status
}

export type Changer = (val: unknown, prop: string) => unknown;