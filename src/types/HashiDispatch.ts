import type { HashiAction } from '../enums/HashiAction';
import type { Cell } from './Cell';

/** object type for dispatch argument */
export type HashiDispatch = {
    action: HashiAction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: {
        rows?: number;
        cols?: number;
        row?: number;
        col?: number;
        index?: number;
        value?: number;
    };
};
