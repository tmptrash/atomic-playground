import Config from "../config";
import { store } from "../store/store";
import { Atom, Dir } from "../types/atom";
import { BondData, BondsState, BONDS_DIRS, BONDS_OFFS, LinePoints } from "../types/bond";
import { getXYByDir } from "./atom";

export function addBonds(bondDatas: BondData[], bonds: BondsState) {
  bondDatas.forEach(bd => {
    if (bd.dir !== Dir.no) {
      bonds.bonds[bd.dir]++;
      bonds.bondDatas[bd.dir].push(bd);
    }
  });
}

export function getLinePoints(a: Atom, d: Dir, state: BondsState): LinePoints {
  const step = Config.grid.stepSize;
  const offs = BONDS_OFFS[d];
  const dirs = BONDS_DIRS[d];
  const i = d as number;
  const arr = state.bonds;
  const curArr = state.curBonds;
  const dist = step * .08;
  const v0 = (arr[i] - 1) * dist;
  const v1 = curArr[i] * dist * 2;
  
  const points: LinePoints = [
    a.x + offs[0] * step - v0 * dirs[0] + v1 * dirs[0], // a.x + offs[0] * step - (arr[i] - 1) * dist * dirs[0] + curArr[i] * dist * 2 * dirs[0],
    a.y + offs[1] * step - v0 * dirs[1] + v1 * dirs[1], // a.y + offs[1] * step - (arr[i] - 1) * dist * dirs[1] + curArr[i] * dist * 2 * dirs[1]
    a.x + offs[2] * step - v0 * dirs[0] + v1 * dirs[0], // a.x + offs[2] * step - (arr[i] - 1) * dist * dirs[0] + curArr[i] * dist * 2 * dirs[0]
    a.y + offs[3] * step - v0 * dirs[1] + v1 * dirs[1]  // a.y + offs[3] * step - (arr[i] - 1) * dist * dirs[1] + curArr[i] * dist * 2 * dirs[1]
  ];
  curArr[i]++;

  return points;
}

export function findBonds(a: Atom, dir: Dir, bonds: BondsState[]): BondsState | null {
  const [x, y] = getXYByDir(a, dir);
  const nearAtom = store.sandbox.atoms.find(atom => atom.x === x && atom.y === y);
  if (nearAtom === undefined) { return null }
  return bonds.find(b => b.atom.id === nearAtom.id) || null;
}