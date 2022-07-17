import Config from "../../config";
import { AtomTypes } from "../../enums/enums";
import { Atom as JsonAtom, Block, Json, Vm } from "../../types/json";
import { Atom } from "../../types/store";

export function changeAtoms(val: Json, prop: string) {
  if (prop === 'atoms') {
    if (val.width !== Config.grid.cols || val.height !== Config.grid.rows) {
      console.error(`Invalid width/height of imported JSON. Required (w=${Config.grid.cols}, h=${Config.grid.rows}). Imported (w=${val.width}, h=${val.height})`);
      return val;
    }

    const stepSize = Config.grid.stepSize;
    const atoms: Atom[] = [];
    val.blocks.forEach((b: Block) => {
      b.atoms.forEach((a: JsonAtom) => {
        // TODO: atom type
        atoms.push({x: a.x * stepSize, y: a.y * stepSize, size: stepSize, type: AtomTypes.Mov});
      });
      b.vms.forEach((v: Vm) => {
        console.log(v);
      });
    });
    return atoms;
  }

  return val;
}