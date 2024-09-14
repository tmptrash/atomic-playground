export enum AtomTypes {
  no  = 0,
  mov = 1,
  fix = 2,
  spl = 3,
  con = 4,
  job = 5,
  rep = 6
}

export const AtomNames = {
  0: 'No atom',
  1: 'mov',
  2: 'fix',
  3: 'spl',
  4: 'con',
  5: 'job',
  6: 'rep'
}

export enum Modes {
  Atoms = 'atoms',
  Bonds = 'bonds'
}