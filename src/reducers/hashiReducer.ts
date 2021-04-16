import type { HashiDispatch } from '../types/HashiDispatch';
import type { HashiState } from '../types/HashiState';
import { HashiAction as Action } from '../enums/HashiAction';
import { HashiSolverMode as Mode } from '../enums/HashiSolverMode';

/** executes the */
export const hashiReducer = (
    state: Readonly<HashiState>,
    action: HashiDispatch
): HashiState => {
    console.log(state, action);
    const next = { ...state };
    switch (action.action) {
        case Action.SOLVE:
            next.mode = Mode.SOLVING;
            break;
        case Action.PAUSE:
            next.mode = Mode.PAUSED;
            break;
        case Action.RESET:
            break;
        case Action.SWITCH_DISPLAY:
            break;
        case Action.CLEAR:
            break;
        case Action.SET_SIZE:
            break;
        case Action.SET_CELL:
            break;
        case Action.SET_EXAMPLE:
            break;
        case Action.CHANGE_SPEED:
            break;
        default:
    }
    return next;
};
