import type { FunctionComponent } from 'react';
import React from 'react';
import { useHashiDispatch, useHashiState } from '../context/HashiContext';
import { HashiAction as Action } from '../enums/HashiAction';
// import { InputSlider } from '@davidjcastner/ui';
import examplePuzzles from '../logic/examples.json';
import { hashiToJson } from '../logic/hashi';

const InputSlider: FunctionComponent<{
    label?: string;
    min: number;
    max: number; }> = ({ label, min, max }) => <div>
    {label}
</div>;

/** adds an interface for setting up the board */
export const Setup: FunctionComponent = () => {
    const dispatch = useHashiDispatch();
    const { hashi } = useHashiState();
    const exportHashi = (): void => {
        const jHashi = hashiToJson(hashi);
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(jHashi));
    };
    return <div className='hashi-setup'>
        <InputSlider
            label='Rows'
            min={3}
            max={15} />
        <InputSlider
            label='Columns'
            min={3}
            max={15} />
        <button onClick={
            (): void => {
                dispatch({ action: Action.CLEAR });
            }
        }>
            clear board
        </button>
        <button onClick={exportHashi}>export</button>
        {
            examplePuzzles.map((puz, idx) => {
                const displayString = `Example ${puz.name} (${puz.cols} x ${puz.rows})`;
                const action = (): void => {
                    dispatch({
                        action: Action.LOAD_EXAMPLE,
                        options: { value: idx },
                    });
                };
                return <button
                    type='button'
                    key={idx}
                    onClick={action}>
                    {displayString}
                </button>;
            })
        }
    </div>;
};
