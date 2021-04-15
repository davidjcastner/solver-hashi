import type { HashiSolverMode } from '../enums/HashiSolverMode';

/** state of the hashi solver program */
export type HashiState = {

    /** current mode of the solver */
    mode: HashiSolverMode;

    // values for setting up board
    rows: number;
    cols: number;
};
