let idValue = 0;

export function id() {
  return (++idValue).toString();
}

export function isObject(obj: unknown): boolean { return !!obj && typeof obj === 'object' }