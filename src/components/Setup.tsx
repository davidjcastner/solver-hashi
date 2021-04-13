import type { FunctionComponent } from 'react';
import React from 'react';
// import { InputSlider } from '@davidjcastner/ui';
import examplePuzzles from '../logic/examples.json';

const InputSlider: FunctionComponent<{
    label?: string;
    min: number;
    max: number; }> = ({ label, min, max }) => <div>
    {label}
</div>;

/** adds an interface for setting up the board */
export const Setup: FunctionComponent = () => <div className='hashi-setup'>
    <InputSlider
        label='Rows'
        min={3}
        max={15} />
    <InputSlider
        label='Columns'
        min={3}
        max={15} />
    <button>clear board</button>
    {
        examplePuzzles.map((puz, idx) => {
            const display = `Example ${puz.name} (${puz.cols} x ${puz.rows})`;
            return <button key={idx}>
                {display}
            </button>;
        })
    }
</div>;
