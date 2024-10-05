import World, { destroy, put } from 'irma5/src/world'
import VMs, { vm } from 'irma5/src/vms'
import Config from '../config'
import { store } from '../store/store'
import { toOffs } from '.'
//
// Recreates the world and put all atoms and vms into it
//
export function sync(world?) {
  world && destroy(world)
  const w = World(Config.grid.cols, Config.grid.rows)
  const vms = putVms(w)
  store.sandbox.atoms.forEach(a => put(w, toOffs(a.x, a.y), a.a))
  return vms
}

function putVms(w) {
  const vms = store.sandbox.vms
  const vmOffs = BigUint64Array.new(vms.length)
  vms.forEach((v, i) => vmOffs[i] = vm(v.offs, v.energy))
  return VMs(w, vmOffs)
}