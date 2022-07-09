import React from 'react';
import get from 'lodash.get';
import { Store } from '../store';

let idValue = 0;

export interface IObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

export function id() {
  return (++idValue).toString();
}

export function bind(path: string): IObj {
  const [, updateState] = React.useState({});
  const update = React.useCallback(() => updateState({}), []);
  const obj = get(Store, path);
  const p = path.split('.');
  const parentKey = p.pop() as string;
  const parent: IObj = p.length < 2 ? Store : get(Store, p.join('.'));

  return parent[parentKey] = new Proxy(obj, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set(target: typeof obj, prop: string | symbol, val: any): boolean {
      target[prop as keyof IObj] = val;
      update();
      return true;
    }
  });
}