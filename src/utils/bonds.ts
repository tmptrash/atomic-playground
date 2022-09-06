import Config from "../config";
import { Atom, Dir } from "../types/atom";
import { BondArrows, BONDS_DIRS, BONDS_OFFS, LinePoints } from "../types/bonds";

export function addBonds(dirs: Dir[], arrows: BondArrows) {
  dirs.forEach(dir => dir !== Dir.no && arrows.arrows[dir]++);
}

export function getLinePoints(a: Atom, d: Dir, arrows: BondArrows): LinePoints {
  const step = Config.grid.stepSize;
  const offs = BONDS_OFFS[d];
  const dirs = BONDS_DIRS[d];
  const i = d as number;
  const arr = arrows.arrows;
  const curArr = arrows.curArrows;
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