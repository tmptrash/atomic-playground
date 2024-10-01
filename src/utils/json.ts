import Config from "../config"
import { Atom } from "../types/atom"
import { Block, Json, Vm } from "../types/json"
import { id } from "."

export function toAtoms(val: Json): Atom[] {
  if (val.width !== Config.grid.cols || val.height !== Config.grid.rows) {
    console.error(`Invalid width/height of imported JSON. Required (w=${Config.grid.cols}, h=${Config.grid.rows}). Imported (w=${val.width}, h=${val.height})`)
    return []
  }

  const stepSize = Config.grid.stepSize
  const atoms: Atom[] = []
  val.blocks.forEach((b: Block) => {
    b.atoms.forEach((a: Atom) => {
      a.id = id()
      a.x *= stepSize
      a.y *= stepSize
      atoms.push(a)
    })
    // TODO: implement this
    b.vms.forEach((v: Vm) => {
      console.log(v)
    })
  })

  return atoms
}