import React from 'react';
import { Store } from '../store';

let idValue = 0;

export function id() {
  return (++idValue).toString();
}

// TODO: add check if an object is already binded
export function bind(obj: IObj) {
  const update = useUpdate();
  const ret = findDeep(Store, obj);
  if (ret === false) { throw new Error(`Storage doesn't contain specified object "${obj}"`) }
  const [parent, key] = ret as StoreKey;

  React.useEffect(() => () => {
    parent[key] = parent[key].old;
    delete parent[key].old;
  });
  React.useEffect(() => {
    parent[key].old = parent[key];
    parent[key] = new Proxy(parent[key], {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(target: IObj, prop: string, val: any): boolean {
        target[prop] = val;
        update();
        return true;
      }
    });
  })
}

type StoreKey = [IObj, string];
interface IObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

function useUpdate() {
  const [, updateState] = React.useState({});
  return () => updateState({});
}

function isObject(obj: unknown): boolean { return !!obj && typeof obj === 'object' }
function findDeep(obj: IObj, val: unknown): StoreKey | boolean {
  for (const p in obj) {
    const v = obj[p];
    if (v === val) { return [obj, p] }
    if (isObject(v)) {
      const ret = findDeep(v, val);
      if (ret) { return ret }
    }
  }

  return false;
}