import { AtomTypes, Modes } from "../enums/enums"
import { Store } from './../types/store'

export const store: Store = {
  sandbox: {
    atoms: []
  },
  status: {
    mode: Modes.Atoms,
    atom: AtomTypes.mov,
    bondIdx: 0
  }
}