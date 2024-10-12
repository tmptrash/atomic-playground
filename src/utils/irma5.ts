import World, { destroy, put, get, WorldType } from 'irma5/src/world'
import VMs, { vm, nrg } from 'irma5/src/vms'
import { toOffs as to32Offs } from 'irma5/src/atom'
import CFG from 'irma5/src/cfg'
import Config from '../config'
import { id, toOffs } from '.'
import { Atom, VM } from '../types'
//
// Recreates the world and put all atoms and vms into it
//
export function send(vms: VM[], atoms: Atom[], w?: WorldType) {
  w && destroy(w)
  CFG.WORLD.width = Config.grid.cols
  CFG.WORLD.height = Config.grid.rows
  w = World(true)
  const irma5Vms = putVms(w, vms)
  atoms.forEach(a => put(w!, toOffs(a.x, a.y), a.a))
  return irma5Vms
}

export function receive(vms): [VM[], Atom[]] {
  if (!vms) return [[], []]
  const offs = vms.offs
  const w = vms.w
  const atoms: Atom[] = []
  const newVms: VM[] = new Array(offs?.i === undefined || offs?.i < 0 ? 0 : offs?.i)
  const step = Config.grid.stepSize
  
  for (let i = 0; i < offs?.i; i++) {
    newVms[i] = {offs: to32Offs(offs[i]), energy: nrg(offs[i])}
  }
  for (let x = 0; x < Config.grid.cols; x++) {
    for (let y = 0; y < Config.grid.rows; y++) {
      const a = get(w, toOffs(x, y, 1))
      if (a) {
        atoms.push({
          id: id(),
          a,
          x: x * step,
          y: y * step
        })
      }
    }
  }

  return [newVms, atoms]
}

function putVms(w, vms) {
  const vmOffs = BigUint64Array.new(vms.length)
  vms.forEach(v => vmOffs.add(vm(v.offs, v.energy)))
  return VMs(w, vmOffs)
}