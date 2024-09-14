import React, { useEffect } from 'react'
import { store } from './store'
import { isObject } from '../utils/utils'
import { Changer } from './../types/store'

type IObj = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any
}
type StoreKey = [IObj, string]
/**
 * Returns a function, which is used to rerender binded component
 */
function useUpdate() {
  const [, updateState] = React.useState({})
  return () => updateState({})
}
/**
 * Binds a component to specified object in a store. Usage:
 * 
 * /// store.ts:
 * export const Store: IStore = {
 *   prop: {
 *     val: 1
 *   }
 * }
 * 
 * /// component.tsx:
 * import { bind } from 'binder'
 * import { Store } from 'store'
 * export default function Component() {
 *   bind(Store.prop)
 *   return <span>My component!</span>
 * }
 * 
 * /// any place in your app:
 * import { Store } from 'store'
 * Store.prop.val = 2 // will rerender binded component
 */
export function bind(obj: IObj, changers?: Changer[]) {
  const update = useUpdate()
  const ret = findDeep(store, obj)
  if (ret === false) { throw new Error(`Storage doesn't contain specified object "${JSON.stringify(obj)}"`) }
  const [parent, key] = ret as StoreKey

  // TODO: check how many time this effects are calling?
  useEffect(() => () => {
    parent[key] = parent[key].old
    delete parent[key].old
  })

  useEffect(() => {
    if (parent[key].old) { throw new Error(`Current store property "${key}" is already user in other component`) }
    parent[key].old = parent[key]
    parent[key] = new Proxy(parent[key], {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(target: IObj, prop: string, val: any): boolean {
        let newVal = val
        changers && changers.forEach(c => newVal = c(newVal, prop))
        target[prop] = newVal
        update()
        return true
      }
    })
  })
}
/**
 * Finds an object by it's reference inside other object
 * @return Found parent and the property with found object or false
 */
function findDeep(obj: IObj, val: unknown): StoreKey | boolean {
  for (const p in obj) {
    if (p === 'old') { continue }
    const v = obj[p]
    if (v === val) { return [obj, p] }
    if (isObject(v)) {
      const ret = findDeep(v, val)
      if (ret) { return ret }
    }
  }

  return false
}