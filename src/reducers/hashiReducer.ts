import type { HashiDispatch } from '../types/HashiDispatch';
import type { HashiState } from '../types/HashiState';
import { HashiAction } from '../enums/HashiAction';

/** executes the */
export const hashiReducer = (
    state: Readonly<HashiState>,
    action: HashiDispatch
): HashiState => {
    return state;
};
