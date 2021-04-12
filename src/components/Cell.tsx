import type { FunctionComponent } from 'react';
import React from 'react';
import { useHashi } from '../context/hashi';

/** renders the current state of the cell */
export const Cell: FunctionComponent<{
    cellId: number;
}> = ({ cellId }) => {
    const { cells } = useHashi();
    // ensure that a null cell is rendered without error to avoid program
    // crashes between state changes of puzzle size
    const cell = cells.length > cellId ? cells[cellId] : null;
    return <div>
        {cellId}
    </div>;
};
