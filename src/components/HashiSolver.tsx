import type {
    CSSProperties,
    FunctionComponent,
} from 'react';
import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import { classify } from '@davidjcastner/ui';
import { Board } from './Board';
import { Controls } from './Controls';
import { Setup } from './Setup';
import {
    HashiContext,
    useHashiState,
} from '../context/HashiContext';
import { clamp } from '../utility/clamp';

/**
 * renders the solver application, the application will take up
 * 100% of parent's width and height, so it is up to the user
 * of HashiSolver to control the parent's size
 *
 * also provides HashiContext to child components
 */
export const HashiSolver: FunctionComponent = () => {
    const { rows, cols } = useHashiState().hashi;

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
        const minCellWidth = 32;
        const maxCellWidth = 48;
        const gapWidth = 4;
        const boardPadding = 16;

        // get calculated container size
        const width = containerRef.current.offsetWidth;
        // const height = containerRef.current.offsetHeight;
        setIsSmall(width < minContainerWidth);

        // calculate the minimum width needed for all cells
        // then check for expanding
        const minBoardWidth = cols * minCellWidth + (cols + 1) * gapWidth;
        let boardSpace = width - boardPadding * 2;

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
            '--hashi-cell-width': `${cellWidth}px`,
            '--hashi-gap-width': `${gapWidth}px`,
            '--hashi-board-padding': `${boardPadding}px`,
        } as CSSProperties);
    };

    // add listener for recalculating width on window resize
    // and calculate width on initial render with useEffect
    useEffect(() => {
        updateContainerSize();
        window.addEventListener('resize', updateContainerSize);
    }, []);

    return <HashiContext>
        <div
            className={
                classify('hashi-solver', {
                    'is-horizontal': isHorizontal,
                    'is-small': isSmall,
                })
            }
            ref={containerRef}
            style={containerStyle}>
            <div className='hashi-panel'>
                <Board />
                <Controls />
            </div>
            <div className='hashi-panel'>
                <Setup />
            </div>
        </div>
    </HashiContext>;
};
