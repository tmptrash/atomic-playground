import Config from "../config"
import { AtomIndexes, Atom, Dir, DIR_OFFS } from "../types"
import { store } from "../store/store"
import { toOffs } from "."
import { b1Dir, b2Dir, b3Dir, elseDir, ifDir, thenDir, type, vmDir } from "irma5/src/atom"
import { ATOM_MOV, ATOM_FIX, ATOM_SPL, ATOM_CON, ATOM_JOB, ATOM_REP } from "irma5/src/shared"

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

/**
 * Returns human readable atom details from it's number 
 */
export function parseAtom(a: number) {
  switch (type(a)) {
  case ATOM_MOV: return `mov(vmDir=${vmDir(a)}, movDir=${b1Dir(a)})`
  case ATOM_FIX: return `fix(vmDir=${vmDir(a)}, b1Dir=${b1Dir(a)}, b2Dir=${b2Dir(a)})`
  case ATOM_SPL: return `spl(vmDir=${vmDir(a)}, b1Dir=${b1Dir(a)}, b2Dir=${b2Dir(a)})`
  case ATOM_CON: return `con(ifDir=${ifDir(a)}, thenDir=${thenDir(a)}, elseDir=${elseDir(a)}, if2Dir=${b3Dir(a)})`
  case ATOM_JOB: return `job(vmDir=${vmDir(a)}, newVmDir=${b1Dir(a)})`
  case ATOM_REP: return `rep(vmDir=${vmDir(a)}, a1Dir=${b1Dir(a)}, a2Dir=${b2Dir(a)})`
  }
  return 'Unknown atom of type "${type(a)}"'
}