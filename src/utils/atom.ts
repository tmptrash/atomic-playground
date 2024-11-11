import Config from "../config"
import { AtomIndexes, Atom, Dir, DIR_OFFS } from "../types"
import { store } from "../store/store"
import { toOffs } from "."

export function nextAtom(type: AtomIndexes): number {
  if (++type > AtomIndexes.rep) { type = AtomIndexes.mov }
  return type
}

export function getXYByDir(a: Atom, dir: Dir): [number, number] {
  const offs = DIR_OFFS[dir]
  const step = Config.grid.stepSize
  return [a.x + offs[0] * step, a.y + offs[1] * step]
}

export function findAtomIdx(atomX: number, atomY: number): number {
  return store.sandbox.atoms.findIndex(a => a.x === atomX && a.y === atomY)
}

export function findAtom(x: number, y: number) {
  const atomIndex = findAtomIdx(x, y)
  if (atomIndex < 0) return {a: {a: 0} as Atom, i: -1}
  const atoms = store.sandbox.atoms
  return {
    a: atoms[atomIndex],
    i: atomIndex
  }
}

export function findVmIdx(x: number, y: number) {
  const offs = toOffs(x, y)
  return store.sandbox.vms.findIndex(vm => vm.offs === offs)
}