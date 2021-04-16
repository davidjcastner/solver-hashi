import type { FunctionComponent } from 'react';
import React, { useEffect, useRef } from 'react';
import { classify } from '@davidjcastner/ui';
import {
    useHashiDispatch,
    useHashiState,
} from '../context/HashiContext';
import { HashiAction as Action } from '../enums/HashiAction';
import { HashiSolverMode as Mode } from '../enums/HashiSolverMode';
import { getCellInfo } from '../logic/hashi';

import '../style/components/HashiCell.css';


/** renders the current state of the cell */
export const HashiCell: FunctionComponent<{
    index: number;
}> = ({ index }) => {
    const dispatch = useHashiDispatch();
    const { mode, displayBoard, hashi, solutions } = useHashiState();
    const canModify = mode === Mode.SETUP;
    const cellRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        cellRef.current?.addEventListener('keydown', (eve) => {
            if (canModify) {
                // eslint-disable-next-line @typescript-eslint/init-declarations
                let value: number | undefined;
                switch (eve.key) {
                    case 'Delete': {
                        value = 0;
                        break;
                    }
                    case 'Backspace': {
                        value = 0;
                        break;
                    }
                    case '1': {
                        value = 1;
                        break;
                    }
                    case '2': {
                        value = 2;
                        break;
                    }
                    case '3': {
                        value = 3;
                        break;
                    }
                    case '4': {
                        value = 4;
                        break;
                    }
                    case '5': {
                        value = 5;
                        break;
                    }
                    case '6': {
                        value = 6;
                        break;
                    }
                    case '7': {
                        value = 7;
                        break;
                    }
                    case '8': {
                        value = 8;
                        break;
                    }
                    // disable these when live
                    // used for development
                    case '-': {
                        value = 9;
                        break;
                    }
                    case '=': {
                        value = 10;
                        break;
                    }
                    case '\'': {
                        value = eve.ctrlKey ? 12 : 11;
                        break;
                    }
                    case '0': {
                        value = 13;
                        break;
                    }
                    default:
                }
                if (value !== undefined) {
                    dispatch({
                        action: Action.SET_CELL,
                        options: {
                            value,
                            index,
                        },
                    });
                }
            }
        });
    }, []);

    // get correct cell to render
    const cell = displayBoard < 0
        ? hashi.cells[index]
        : solutions[displayBoard][index];
    const info = getCellInfo(cell);

    // compile classes
    const cellClasses = classify(
        'hashi-cell',
        // attributes
        {
            'hashi-cell-is-node': info.isNode,
            'hashi-cell-is-edge': info.isEdge,
            'hashi-cell-is-horizontal': info.isHorizontal,
            'hashi-cell-is-vertical': info.isVertical,
        },
        // value classes
        {
            'hashi-cell-unknown': cell === 0,
            'hashi-cell-node-1': cell === 1,
            'hashi-cell-node-2': cell === 2,
            'hashi-cell-node-3': cell === 3,
            'hashi-cell-node-4': cell === 4,
            'hashi-cell-node-5': cell === 5,
            'hashi-cell-node-6': cell === 6,
            'hashi-cell-node-7': cell === 7,
            'hashi-cell-node-8': cell === 8,
            'hashi-cell-horizontal-1': cell === 9,
            'hashi-cell-horizontal-2': cell === 10,
            'hashi-cell-vertical-1': cell === 11,
            'hashi-cell-vertical-2': cell === 12,
            'hashi-cell-blank': cell === 13,
        }
    );
    return <div
        className={cellClasses}
        ref={cellRef}
        tabIndex={canModify ? 0 : undefined} >
        <div className='hashi-cell-container'>
            <div className='hashi-cell-bar' />
            <div className='hashi-cell-bar' />
            <div className='hashi-cell-value' />
        </div>
    </div>;
};
