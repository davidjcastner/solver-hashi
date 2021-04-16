import type { HashiSolverMode } from '../enums/HashiSolverMode';
import type { BoardState } from '../types/BoardState';

/** state of the hashi solver program */
export type HashiState = {

    /** current mode of the solver */
    mode: HashiSolverMode;

    /** number of rows the board has */
    rows: number;

    /** number of columns the board has */
    cols: number;

    /** which solution to display, -1 for current board */
    displayBoard: number;

    /** current set of cells the puzzle is working on */
    board: BoardState;

    /** all solutions the solver found so far */
    solutions: Array<BoardState>;
};
