import { AtomTypes, EditModes, Atom } from "./atom"

export type Sandbox = {
  atoms: Atom[]
}
export type Status = {
  mode: EditModes
  atom: AtomTypes
  curAtom: AtomTypes
  bondIdx: number
}
export type Store = {
  sandbox: Sandbox
  status: Status
}

export type Changer = (val: unknown, prop: string) => unknown