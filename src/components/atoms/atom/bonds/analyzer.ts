import Config from "../../../../config";
import { AtomTypes } from "../../../../enums/enums";
import { Atom } from "../../../../types/atom";
import { BondsState } from "../../../../types/bond";
import { getBond1Dir, getBond2Dir, getMovDir, getVmDir } from "../../../../utils/atom";
import { addBonds, findBonds } from "../../../../utils/bonds";

export const ATOM_BONDS = {
  [AtomTypes.Mov]: getMovBonds,
  [AtomTypes.Fix]: getFixBonds,
  [AtomTypes.Spl]: drawEmpty,
  [AtomTypes.If]:  drawEmpty,
  [AtomTypes.Job]: drawEmpty
}

// TODO: will be removed soon
// eslint-disable-next-line @typescript-eslint/no-empty-function
function drawEmpty(a: Atom, bonds: BondsState, allBonds: BondsState[]) {}

function getMovBonds(a: Atom, bonds: BondsState) {
  addBonds([
    { type: 'Arrow', dir: getVmDir(a.a), color: Config.vm.nextColor },
    { type: 'Arrow', dir: getMovDir(a.a), color: Config.bonds.movDirColor }
  ], bonds
  );
}

function getFixBonds(a: Atom, bonds: BondsState, allBonds: BondsState[]) {
  const vmDir = getVmDir(a.a);
  const bond1Dir = getBond1Dir(a.a);
  const bond2Dir = getBond2Dir(a.a);
  const nearBonds = findBonds(a, bond2Dir, allBonds);

  addBonds([
    { type: 'Arrow', dir: vmDir, color: Config.vm.nextColor },
    { type: 'Sceptre', dir: bond1Dir, color: Config.bonds.bond1Color },
  ], bonds
  );
  nearBonds && addBonds([
    { type: 'Sceptre', dir: vmDir, color: Config.bonds.bond2Color },
  ], nearBonds
  );
}