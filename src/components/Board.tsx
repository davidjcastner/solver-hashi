import type { FunctionComponent } from 'react';
import React from 'react';
import { Cell } from './Cell';

/** renders all cells and background for the hashi puzzle */
export const Board: FunctionComponent<{
    rows: number;
    cols: number;
}> = ({ rows, cols }) => {
    const rowElements = Array.from(Array(rows), (rowVal, rowIdx) => {
        const colElements = Array.from(Array(cols), (colVal, colIdx) => {
            // eslint-disable-next-line no-mixed-operators
            const cellId = rowIdx * cols + colIdx;
            return <Cell
                key={colIdx}
                cellId={cellId} />;
        });
        return <div
            key={rowIdx}
            className='hashi-board-row'>
            {...colElements}
        </div>;
    });
    return <div className='hashi-board'>
        {...rowElements}
    </div>;
};
