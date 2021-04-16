import type { FunctionComponent } from 'react';
import React from 'react';
import { ActionIconButton } from '@davidjcastner/ui';
import {
    useHashiDispatch,
    useHashiState,
} from '../context/HashiContext';
import { HashiAction } from '../enums/HashiAction';
import { HashiSolverMode as Mode } from '../enums/HashiSolverMode';


/** play button */
const Play: FunctionComponent = () => {
    const dispatch = useHashiDispatch();
    const { mode } = useHashiState();
    const display = mode !== Mode.SOLVING;
    const action = (): void => { dispatch({ action: HashiAction.SOLVE }); };

    return <ActionIconButton
        tooltip='Solve'
        icon='play_arrow'
        action={action}
        display={display} />;
};


/** controls the solving process */
export const Controls: FunctionComponent = () => {
    const dispatch = useHashiDispatch();
    const { mode } = useHashiState();
    const displayPause = mode === Mode.SOLVING;
    return <div className='hashi-controls'>
        {
            !displayPause && <ActionIconButton
                tooltip='Solve'
                icon='play_arrow'
                action={
                    (): void => {
                        dispatch({ action: HashiAction.SOLVE });
                    }
                } />
        }
        {
            displayPause && <ActionIconButton
                tooltip='Pause'
                icon='pause'
                action={
                    (): void => {
                        dispatch({ action: HashiAction.PAUSE });
                    }
                } />
        }
        <ActionIconButton
            tooltip='Reset'
            icon='replay'
            action={
                (): void => {
                    dispatch({ action: HashiAction.RESET });
                }
            } />
        <div>Speed Changer</div>
    </div>;
};
