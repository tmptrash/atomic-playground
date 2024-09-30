import { AtomTypes, Modes } from "../enums/enums"
import { Atom } from "../types/atom"
import { Store } from './../types/store'

export const store: Store = {
  sandbox: {
    atoms: [],
    curAtom: {a: 0} as Atom
  },
  status: {
    mode: Modes.Atoms,
    atom: AtomTypes.mov,
    bondIdx: 0
  }
}