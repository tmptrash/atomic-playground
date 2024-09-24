import { AtomTypes } from "../enums/enums"
import { store } from "../store/store"
import { Atom, Dir } from "../types/atom"

const DIR_OFFS = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]]

export function nextAtom(type: AtomTypes): number {
  if (++type > AtomTypes.rep) { type = AtomTypes.mov }
  return type
}

export function getXYByDir(a: Atom, dir: Dir): [number, number] {
  const offs = DIR_OFFS[dir]
  return [a.x + offs[0], a.y + offs[1]]
}

export function findAtomIdx(atomX: number, atomY: number): number {
  return store.sandbox.atoms.findIndex(a => a.x === atomX && a.y === atomY)
}

export function findAtom(x: number, y: number) {
  const atomIndex = findAtomIdx(x, y)
  if (atomIndex < 0) return {}
  const atoms = store.sandbox.atoms
  return {
    a: atoms[atomIndex],
    i: atomIndex
  }
}