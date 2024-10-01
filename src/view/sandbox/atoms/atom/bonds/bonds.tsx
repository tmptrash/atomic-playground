/**
 * Renders all bonds around the atom. We have 8 directions around
 * an atom and two arrow types (Arrow and Sceptre)
 */
import React from 'react'
import { IBond, getArrows } from './analyzer'

type Props = {
  bonds: IBond[]
}
export function Bonds({bonds}: Props) {
  return <>{getArrows(bonds)}</>
}