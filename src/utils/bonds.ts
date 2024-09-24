import Config from "../config"
import { store } from "../store/store"
import { Atom, Dir } from "../types/atom"
import { BondData, BondsState, BONDS_OFFS, LinePoints } from "../types/bond"
import { getXYByDir } from "./atom"

// TODO: remove this
export function addBonds(bondDatas: BondData[], bonds: BondsState) {
  bondDatas.forEach(bd => {
    if (bd.dir !== Dir.no) {
      bonds.bonds[bd.dir]++
      bonds.bondDatas[bd.dir].push(bd)
    }
  })
}

export function getLinePoints(x: number, y: number, d: Dir, bondIdx: number, bonds: number): LinePoints {
  const step = Config.grid.stepSize
  const offs = BONDS_OFFS[d]
  const lineWidth = Config.grid.lineWidth * 3

  // two bonds. use: two additional coordinates to move them
  if (bonds === 2) return [
    x + offs[0] * step + offs[4 + bondIdx * 2] * step,
    y + offs[1] * step + offs[5 + bondIdx * 2] * step,
    x + offs[2] * step + offs[4 + bondIdx * 2] * step,
    y + offs[3] * step + offs[5 + bondIdx * 2] * step
  ]
  // three bonds. use: two additional coordinates and x0,y0,x1,y1 in the middle
  if (bonds === 3) return [
    x + offs[0] * step + bondIdx === 2 ? 0 : offs[4 + bondIdx * 2],
    y + offs[1] * step + bondIdx === 2 ? 0 : offs[5 + bondIdx * 2],
    x + offs[2] * step + bondIdx === 2 ? 0 : offs[4 + bondIdx * 2] + lineWidth,
    y + offs[3] * step + bondIdx === 2 ? 0 : offs[5 + bondIdx * 2] + lineWidth
  ]
  // four bonds. use: first with additional coords & the same * 2, second with additional coords & the same * 2
  if (bonds === 4) return [
    x + offs[0] * step + bondIdx < 2 ? offs[4 + bondIdx * 2] : offs[4 + bondIdx - 2] * 2,
    y + offs[1] * step + bondIdx < 2 ? offs[5 + bondIdx * 2] : offs[5 + bondIdx - 2] * 2,
    x + offs[2] * step + bondIdx < 2 ? offs[4 + bondIdx * 2] : offs[4 + bondIdx - 2] * 2 + lineWidth,
    y + offs[3] * step + bondIdx < 2 ? offs[5 + bondIdx * 2] : offs[5 + bondIdx - 2] * 2 + lineWidth
  ]
  // only one bond. use: x0,y0,x1,y1
  return [
    x + offs[0] * step,
    y + offs[1] * step,
    x + offs[2] * step + lineWidth,
    y + offs[3] * step + lineWidth
  ]
}

export function findBonds(a: Atom, dir: Dir, bonds: BondsState[]): BondsState | null {
  const [x, y] = getXYByDir(a, dir)
  const nearAtom = store.sandbox.atoms.find(atom => atom.x === x && atom.y === y)
  if (nearAtom === undefined) { return null }
  return bonds.find(b => b.atom.id === nearAtom.id) || null
}