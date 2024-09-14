/**
 * Renders all bonds around the atom. We have 8 directions around
 * an atom and two arrow types (Arrow and Sceptre)
 */
import React from 'react'
import { type } from 'irma5/src/atom'
import { Atom } from '../../../../types/atom'
import { ATOM_BONDS } from './analyzer'

type Props = {
  atom: Atom
}
export function Bonds({atom}: Props) {
  return <>{ATOM_BONDS[type(atom.a)](atom)}</>
}