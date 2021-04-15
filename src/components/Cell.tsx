import type { FunctionComponent } from 'react';
import React, { useEffect, useRef } from 'react';
import { useHashiState } from '../context/HashiContext';

/** renders the current state of the cell */
export const Cell: FunctionComponent<{
    cellId: number;
}> = ({ cellId }) => {
    // const { cells } = useHashiState();
    const disabled = false;
    const cellRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        cellRef.current?.addEventListener('keydown', (eve) => {
            console.log(event);
        });
    }, []);
    // ensure that a null cell is rendered without error to avoid program
    // crashes between state changes of puzzle size
    // const cell = cells.length > cellId ? cells[cellId] : null;
    return <div
        className='hashi-cell'
        ref={cellRef}
        // eslint-disable-next-line no-undefined
        tabIndex={disabled ? undefined : 0}>
        {cellId}
    </div>;
};
