import World, { destroy, put } from 'irma5/src/world'
import VMs, { vm, nrg } from 'irma5/src/vms'
import { get } from 'irma5/src/world'
import { toOffs as to32Offs } from 'irma5/src/atom'
import Config from '../config'
import { id, toOffs } from '.'
import { Atom, VM } from '../types'
import CFG from 'irma5/src/cfg'
//
// Recreates the world and put all atoms and vms into it
//
export function send(vms, atoms, w?) {
  w && destroy(w)
  CFG.WORLD.width = Config.grid.cols
  CFG.WORLD.height = Config.grid.rows
  w = World(true)
  vms = putVms(w, vms)
  atoms.forEach(a => put(w, toOffs(a.x, a.y), a.a))
  return vms
}

export function receive(vms): [VM[], Atom[]] {
  const offs = vms.offs
  const w = vms.w
  const atoms: Atom[] = []
  const newVms: VM[] = new Array(offs?.i)
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