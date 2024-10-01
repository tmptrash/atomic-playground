import { AtomIndexes, EditModes, Store } from "../types"

export const store: Store = {
  sandbox: {
    atoms: []
  },
  status: {
    mode: EditModes.Atoms,
    atom: AtomIndexes.mov,
    curAtom: AtomIndexes.no,
    bondIdx: 0
  }
}