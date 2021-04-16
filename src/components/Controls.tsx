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


/** pause button */
const Pause: FunctionComponent = () => {
    const dispatch = useHashiDispatch();
    const { mode } = useHashiState();
    const display = mode === Mode.SOLVING;
    const action = (): void => { dispatch({ action: HashiAction.PAUSE }); };

    return <ActionIconButton
        tooltip='Pause'
        icon='pause'
        action={action}
        display={display} />;
};


/** reset button */
const Reset: FunctionComponent = () => {
    const dispatch = useHashiDispatch();
    const { mode } = useHashiState();
    const disabled = mode === Mode.SOLVING || mode === Mode.SETUP;
    const action = (): void => { dispatch({ action: HashiAction.RESET }); };

    return <ActionIconButton
        tooltip='Reset'
        icon='replay'
        action={action}
        disabled={disabled} />;
};


/** controls the solving process */
export const Controls: FunctionComponent = () => <div className='hashi-controls'>
    <Play />
    <Pause />
    <Reset />
    <div>Speed Changer</div>
</div>;
