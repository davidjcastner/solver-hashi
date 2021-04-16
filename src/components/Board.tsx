import type { FunctionComponent } from 'react';
import React from 'react';
import { HashiCell } from './HashiCell';
import { useHashiState } from '../context/HashiContext';

/** renders all cells and background for the hashi puzzle */
export const Board: FunctionComponent = () => {
    const { rows, cols } = useHashiState().hashi;
    const rowElements = Array.from(Array(rows), (rowVal, rowIdx) => {
        const colElements = Array.from(Array(cols), (colVal, colIdx) => {
            // eslint-disable-next-line no-mixed-operators
            const index = rowIdx * cols + colIdx;
            return <HashiCell
                key={colIdx}
                index={index} />;
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
