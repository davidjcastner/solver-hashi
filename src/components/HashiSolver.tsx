import type { FunctionComponent } from 'react';
import type { HashiContext } from '../types/HashiContext';
import React, { useState } from 'react';
import { Board } from './Board';
import { Controls } from './Controls';
import { Setup } from './Setup';
import { HashiCtxComp, initialHashiContext } from '../context/hashi';

/**
 * renders the solver application
 *
 * also provides HashiContext to child components
 */
export const HashiSolver: FunctionComponent = () => {
    // TODO: switch to useReducer
    const [state, setState] = useState<HashiContext>(initialHashiContext);
    return <HashiCtxComp.Provider value={state}>
        <div className='hashi-solver'>
            <Board
                rows={5}
                cols={6} />
            <Controls />
            <Setup />
        </div>
    </HashiCtxComp.Provider>;
};
