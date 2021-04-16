import type { HashiDispatch } from '../types/HashiDispatch';
import type { HashiState } from '../types/HashiState';
import type { JsonHashi } from '../types/JsonHashi';
import { HashiAction as Action } from '../enums/HashiAction';
import { HashiSolverMode as Mode } from '../enums/HashiSolverMode';
import {
    clearHashi,
    hashiFromJson,
    resetHashi,
    resizeHashi,
    updateCell,
} from '../logic/hashi';
import examples from '../logic/examples.json';

/** executes the */
export const hashiReducer = (
    state: Readonly<HashiState>,
    action: HashiDispatch
): HashiState => {
    const next = { ...state };
    switch (action.action) {
        case Action.SOLVE: {
            next.mode = Mode.SOLVING;
            break;
        }
        case Action.PAUSE: {
            next.mode = Mode.PAUSED;
            break;
        }
        case Action.RESET: {
            next.mode = Mode.SETUP;
            next.hashi = resetHashi(next.hashi);
            next.solutions = [];
            next.displayBoard = -1;
            break;
        }
        case Action.SWITCH_DISPLAY: {
            const value = action.options?.value ?? next.displayBoard;
            next.displayBoard = value;
            break;
        }
        case Action.CLEAR: {
            next.mode = Mode.SETUP;
            next.hashi = clearHashi(next.hashi);
            next.solutions = [];
            next.displayBoard = -1;
            break;
        }
        case Action.SET_SIZE: {
            const rows = action.options?.rows ?? next.hashi.rows;
            const cols = action.options?.cols ?? next.hashi.cols;
            next.hashi = resizeHashi(next.hashi, rows, cols);
            next.solutions = [];
            next.displayBoard = -1;
            break;
        }
        case Action.SET_CELL: {
            const index = action.options?.index;
            const value = action.options?.value;
            if (index !== undefined && value !== undefined) {
                next.hashi = updateCell(next.hashi, index, value);
            }
            break;
        }
        case Action.LOAD_EXAMPLE: {
            const value = action.options?.value;
            if (value !== undefined && value >= 0 && value < examples.length) {
                next.hashi = hashiFromJson(
                    examples[value] as unknown as JsonHashi
                );
                next.solutions = [];
                next.displayBoard = -1;
            }
            break;
        }
        case Action.CHANGE_SPEED: {
            const value = action.options?.value ?? next.solveSpeed;
            next.solveSpeed = value;
            break;
        }
        default: {
            // do nothing
        }
    }
    return next;
};
