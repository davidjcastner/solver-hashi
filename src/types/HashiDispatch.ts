import type { HashiAction } from '../enums/HashiAction';

/** object type for dispatch argument */
export type HashiDispatch = {
    action: HashiAction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
};
