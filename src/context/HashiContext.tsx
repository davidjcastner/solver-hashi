import type {
    Dispatch,
    FunctionComponent,
    Reducer,
} from 'react';
import type { HashiDispatch } from '../types/HashiDispatch';
import type { HashiState } from '../types/HashiState';
import React, {
    useContext,
    useReducer,
} from 'react';
import { HashiSolverMode } from '../enums/HashiSolverMode';
import { initialize } from '../logic/hashi';
import { hashiReducer } from '../reducers/hashiReducer';


// initial state
const initialState: HashiState = {
    mode: HashiSolverMode.SETUP,
    hashi: initialize(5, 5),
    displayBoard: -1,
    solutions: [],
    solveSpeed: 1,
};

// state and dispatch contexts
// two separate contexts for performance (avoids rerendering problems)
const StateCtx = React.createContext<HashiState>(initialState);
const DispatchCtx = React.createContext<Dispatch<HashiDispatch>>(
    (value: HashiDispatch) => {}
);

// custom hooks for child components
export const useHashiState = (): HashiState => useContext(StateCtx);
export const useHashiDispatch = (): Dispatch<HashiDispatch> => useContext(
    DispatchCtx
);

export const HashiContext: FunctionComponent = ({ children }) => {
    // setup reducer and context for children
    const [state, dispatch] = useReducer<Reducer<HashiState, HashiDispatch>>(
        hashiReducer,
        initialState
    );

    // render context providers with children
    return <DispatchCtx.Provider value={dispatch}>
        <StateCtx.Provider value={state}>
            {children}
        </StateCtx.Provider>
    </DispatchCtx.Provider>;
};
