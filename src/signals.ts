import { signal } from "@preact/signals-react";
import { Atom, AtomIndexes, EditModes, VM } from "./types";
import Config from "./config";
/**
 * Represents atoms array, which we draw on a sandbox
 */
export const ATOMS_SIGNAL = signal([] as Atom[])
/**
 * Represents virtual machines inside the sandbox
 */
export const VMS_SIGNAL = signal([] as VM[])
/**
 * Represents current VM index in VMS_SIGNAL array
 */
export const VM_IDX_SIGNAL = signal(0)
/**
 * Represents synchronization between atomic playground and irma5 world
 */
export const SYNCED_SIGNAL = signal(false)
/**
 * Represents an edit mode: Atoms, Bonds, VMs on the status panel
 */
export const MODE_SIGNAL = signal(EditModes.Atom)
/**
 * Represents current atom for adding into the sandbox
 */
export const ADD_ATOM_SIGNAL = signal(AtomIndexes.mov)
/**
 * Represents an atom under mouse
 */
export const CUR_ATOM_SIGNAL = signal(AtomIndexes.no)
/**
 * Represents hovered atom to show it's details
 */
export const HOVERED_ATOM_SIGNAL = signal('')
/**
 * Represents current bond to set
 */
export const ADD_BOND_IDX_SIGNAL = signal(0)
/**
 * Represents amount of energy in an input
 */
export const ENERGY_SIGNAL = signal(Config.vm.energy)
