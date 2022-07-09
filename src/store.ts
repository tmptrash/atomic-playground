import { Modes } from "./enums/enums";

export interface ISandbox {
    mode: Modes
}
export interface IStore {
  sandbox: ISandbox
}

export const Store: IStore = {
  sandbox: {
    mode: Modes.Edit
  }
}