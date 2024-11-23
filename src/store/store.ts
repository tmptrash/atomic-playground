import Config from "../config"
import { AtomIndexes, EditModes, Store } from "../types"

export const store: Store = {
  sandbox: {
    atoms: [],
    vms: [],
    vmIdx: 0,
    synced: false
  },
  status: {
    mode: EditModes.Atom,
    atom: AtomIndexes.mov,
    curAtom: AtomIndexes.no,
    bondIdx: 0,
    energy: Config.vm.energy
  }
}