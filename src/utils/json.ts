import Config from "../config";
import { Atom as JsonAtom, Block, Json, Vm } from "../types/json";
import { Atom } from "../types/store";
import { id } from "./utils";

export function toAtoms(val: Json): Atom[] {
  if (val.width !== Config.grid.cols || val.height !== Config.grid.rows) {
    console.error(`Invalid width/height of imported JSON. Required (w=${Config.grid.cols}, h=${Config.grid.rows}). Imported (w=${val.width}, h=${val.height})`);
    return [];
  }

  const atoms: Atom[] = [];
  val.blocks.forEach((b: Block) => {
    b.atoms.forEach((a: JsonAtom) => atoms.push({id: id(), x: a.x, y: a.y, a: a.a}));
    b.vms.forEach((v: Vm) => {
      console.log(v);
    });
  });

  return atoms;
}