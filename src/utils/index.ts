export * from './atom'
export * from './bond'
export * from './json'

let _id = 0
/**
 * Extend Array type with count() function
 */
declare global {
  interface Array<T> {
    amount(cb: (el: any) => boolean): number;
  }
}
Array.prototype.amount = function (cb: (el: unknown) => boolean) {
  let amount = 0
  for (let i = 0; i < this.length; i++) cb(this[i]) && amount++
  return amount
}
/**
 * Generates unique string id's within entire app
 */
export function id() { return (++_id).toString() }
/**
 * Checks if specified value is an object
 */
export function isObject(obj: unknown): boolean { return !!obj && typeof obj === 'object' }
/**
 * Generates an array of numbers from 0 to n-1
 * @returns number[]
 */
export function arr(n: number) { return Array.from(Array(n).keys()) }