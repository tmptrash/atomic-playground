import { signal } from "@preact/signals-react";
import { EditModes } from "../types";

export const MODE_SIGNAL = signal(EditModes.Atom)