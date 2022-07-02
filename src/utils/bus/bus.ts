// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Cb = (...params: any) => void;
const EVENTS: Record<string, Array<Cb>> = {};

export function on(event: string, cb: Cb) {
  if (!EVENTS[event]) { EVENTS[event] = [] }
  EVENTS[event].push(cb);
}

export function off(event: string, cb: Cb) {
  if (!EVENTS[event]) { return }
  const index = EVENTS[event].indexOf(cb);
  if (index == -1) { return }
  EVENTS[event].splice(index, 1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fire(event: string, ...params: any) {
  if (!EVENTS[event]) {
    console.error(`Invalid event ${event}`);
    return;
  }
  EVENTS[event].forEach(cb => cb(...params));
}