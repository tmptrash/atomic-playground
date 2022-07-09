let idValue = 0;

export function id() {
  return (++idValue).toString();
}