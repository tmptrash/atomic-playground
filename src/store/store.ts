import { AtomTypes, Modes } from "../enums/enums";
import { Store } from './../types/store';

export const store: Store = {
  sandbox: {
    atoms: []
  },
  status: {
    mode: Modes.Add,
    atom: AtomTypes.mov
  }
}