import { AtomTypes, Modes } from "../enums/enums"
import { Store } from './../types/store'

export const store: Store = {
  sandbox: {
    atoms: []
  },
  status: {
    mode: Modes.Atoms,
    atom: AtomTypes.mov,
    curAtom: AtomTypes.no,
    bondIdx: 0
  }
}