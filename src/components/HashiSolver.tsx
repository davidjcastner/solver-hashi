import type { CSSProperties, FunctionComponent } from 'react';
import type { HashiContext } from '../types/HashiContext';
import React, { useEffect, useRef, useState } from 'react';
import { Board } from './Board';
import { Controls } from './Controls';
import { Setup } from './Setup';
import { HashiCtxComp, initialHashiContext } from '../context/hashi';


/** ensures that the num is between min and max */
const clamp = (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
};


/**
 * renders the solver application, the application will take up
 * 100% of parent's width and height, so it is up to the user
 * of HashiSolver to control the parent's size
 *
 * also provides HashiContext to child components
 */
export const HashiSolver: FunctionComponent = () => {
    // TODO: switch to useReducer
    const [state, setState] = useState<HashiContext>(initialHashiContext);
    const rows = 5;
    const cols = 6;

    // state for ui display of HashiSolver component (not children)
    const [containerStyle, setContainerStyle] = useState<CSSProperties>();
    const [isSmall, setIsSmall] = useState(false);
    const [isHorizontal, setIsHorizontal] = useState(false);

    // create a reference to the html container element
    const containerRef = useRef<HTMLDivElement>(null);
    const updateContainerSize = (): void => {
        // skip is container is not rendered yet
        if (containerRef.current === null) { return; }

        // TODO: set sizes as constants at top of file
        // all constants represent px amounts
        const minContainerWidth = 280;
        const minSidePanelWidth = 280;
        const minCellWidth = 16;
        const maxCellWidth = 24;
        const gapWidth = 1;

        // get calculated container size
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        console.log(width, height);
        if (width < minContainerWidth) {
            setIsSmall(true);
        }

        // calculate the minimum width needed for all cells
        // then check for expanding
        const minBoardWidth = cols * minCellWidth + (cols + 1) * gapWidth;
        let boardSpace = width;

        // min size for setup panel is 280px
        // so if container width is greater than min board width
        // plus 280px then setup panel can be display horizontally adjacent
        if (width > minSidePanelWidth + minBoardWidth) {
            setIsHorizontal(true);
            // remove minimum side panel width from board space
            boardSpace = width - minSidePanelWidth;
        } else {
            setIsHorizontal(false);
        }

        // calculate cell width
        // by splitting remaining space evenly among cells
        // up to max cell width
        const remainingSpace = boardSpace - (cols + 1) * gapWidth;
        const cellWidth = clamp(
            Math.floor(remainingSpace / cols),
            minCellWidth,
            maxCellWidth
        );

        // set state's style string
        setContainerStyle({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ['--hashi-cell-width' as any]: `${cellWidth}px`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ['--hashi-gap-width' as any]: `${gapWidth}px`,
        });
    };

    // add listener for recalculating width on window resize
    // and calculate width on initial render with useEffect
    window.addEventListener('resize', updateContainerSize);
    useEffect(() => {
        updateContainerSize();
    }, [containerRef]);

    return <HashiCtxComp.Provider value={state}>
        <div
            className='hashi-solver'
            ref={containerRef}
            style={containerStyle}>
            <Board
                rows={rows}
                cols={cols} />
            <Controls />
            <Setup />
        </div>
    </HashiCtxComp.Provider>;
};
