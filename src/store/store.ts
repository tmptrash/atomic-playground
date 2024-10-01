import { AtomIndexes, EditModes, Store } from "../types"

export const store: Store = {
  sandbox: {
    atoms: [],
    vms: []
  },
  status: {
    mode: EditModes.Atom,
    atom: AtomIndexes.mov,
    curAtom: AtomIndexes.no,
    bondIdx: 0
  }
}