import { AtomTypes, EditModes, Store } from "../types"

export const store: Store = {
  sandbox: {
    atoms: []
  },
  status: {
    mode: EditModes.Atoms,
    atom: AtomTypes.mov,
    curAtom: AtomTypes.no,
    bondIdx: 0
  }
}