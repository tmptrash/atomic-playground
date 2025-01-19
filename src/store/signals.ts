import { Signal, signal } from "@preact/signals-react";
import { Atom, EditModes } from "../types";
/**
 * Represents an edit mode: Atoms, Bonds, VMs on the status panel
 */
export const MODE_SIGNAL = signal(EditModes.Atom)
/**
 * Represents atoms array, which we draw on a sandbox
 */
export const ATOMS_SIGNAL: Signal<Atom[]> = signal([])