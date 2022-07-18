let idValue = 0;
/**
 * Generates unique string id's within entire app
 */
export function id() { return (++idValue).toString() }
/**
 * Checks if specified value is an object
 */
export function isObject(obj: unknown): boolean { return !!obj && typeof obj === 'object' }
/**
 * Generates an array of numbers from 0 to n-1
 * @returns number[]
 */
export function arr(n: number) { return Array.from(Array(n).keys()) }