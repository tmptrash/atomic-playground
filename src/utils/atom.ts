import Config from "../config"
import { AtomIndexes, Atom, Dir, DIR_OFFS } from "../types"
import { toOffs } from "."
import { b1Dir, b2Dir, b3Dir, elseDir, ifDir, thenDir, type, vmDir } from "irma5/src/atom"
import { ATOM_MOV, ATOM_FIX, ATOM_SPL, ATOM_CON, ATOM_JOB, ATOM_REP } from "irma5/src/shared"
import Konva from "konva"
import { Vector2d } from "konva/lib/types"
import { ATOMS_SIGNAL, VMS_SIGNAL } from "../signals"

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
  return ATOMS_SIGNAL.value.findIndex(a => a.x === atomX && a.y === atomY)
}

export function findAtom(x: number, y: number) {
  const atomIndex = findAtomIdx(x, y)
  if (atomIndex < 0) return {a: {a: 0} as Atom, i: -1}
  return {
    a: ATOMS_SIGNAL.value[atomIndex],
    i: atomIndex
  }
}

export function findVmIdx(x: number, y: number) {
  const offs = toOffs(x, y)
  return VMS_SIGNAL.value.findIndex(vm => vm.offs === offs)
}

export function getRelatedPos(stage: Konva.Stage, zoom: number): [number, number] {
  const pos = stage.getPointerPosition() as Vector2d
  return [(pos.x - stage.position().x) / zoom, (pos.y - stage.position().y) / zoom]
}

export function atomUnder(stage: Konva.Stage, zoom: number) {
  const step = Config.grid.stepSize
  const [x, y] = getRelatedPos(stage, zoom)
  const [ax, ay] = [Math.floor(x / step) * step, Math.floor(y / step) * step]
  if (ax < 0 || ay < 0 || ax >= Config.grid.rows * step || ay >= Config.grid.cols * step) { return {} }
  return {a: findAtom(ax, ay), ax, ay}
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
  return `Unknown atom '${a}' with type '${type(a)}'`
}