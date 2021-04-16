import type { HashiSolverMode } from '../enums/HashiSolverMode';
import type { Cell } from '../types/Cell';
import type { Hashi } from '../types/Hashi';

/** state of the hashi solver program */
export type HashiState = {

    /** current mode of the solver */
    mode: HashiSolverMode;

    /** the current state of the puzzle */
    hashi: Hashi;

    /** all solutions the solver found so far */
    solutions: Array<Array<Cell>>;

    /** which solution to display, -1 for current board */
    displayBoard: number;

    /** rate for solving the puzzle */
    solveSpeed: number;
};
