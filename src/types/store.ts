import { EditModes } from "."
import { AtomIndexes, Atom } from "./atom"

export type Sandbox = {
  atoms: Atom[]
}
export type Status = {
  mode: EditModes
  atom: AtomIndexes
  curAtom: AtomIndexes
  bondIdx: number
}
export type Store = {
  sandbox: Sandbox
  status: Status
}

export type Changer = (val: unknown, prop: string) => unknown