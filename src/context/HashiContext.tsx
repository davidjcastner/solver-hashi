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
import { hashiReducer } from '../reducers/hashiReducer';


// initial state
const initialState: HashiState = {
    mode: HashiSolverMode.SETUP,
    rows: 5,
    cols: 5,
};

// helper types for shorthand notation
type Dispatcher = Dispatch<HashiDispatch>;
type HashiReducer = Reducer<HashiState, HashiDispatch>;

// state and dispatch contexts
// two separate contexts for performance (avoids rerendering problems)
const StateCtx = React.createContext<HashiState>(initialState);
const DispatchCtx = React.createContext<Dispatcher>(
    (value: HashiDispatch) => {}
);

// custom hooks for child components
export const useHashiState = (): HashiState => useContext(StateCtx);
export const useHashiDispatch = (): Dispatcher => useContext(DispatchCtx);

export const HashiContext: FunctionComponent = ({ children }) => {
    // setup reducer and context for children
    const [state, dispatch] = useReducer<HashiReducer>(
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
