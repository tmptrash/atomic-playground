import { EditModes, AtomIndexes, Atom, VM } from "."

export type Sandbox = {
  atoms: Atom[]
  vms: VM[]
  vmIdx: number
  synced: boolean
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