import type { Cell } from '../types/Cell';
import type { CellInfo } from '../types/CellInfo';
import type { Hashi } from '../types/Hashi';
import type { JsonHashi } from '../types/JsonHashi';


// ----------------------------------------------------------------
// all the valid types of cells
// ----------------------------------------------------------------
const DEFAULT_CELL: Cell = 0;
const CELLS: Record<Cell, CellInfo> = {

    /** unknown */
    0: {
        isNode: false,
        nodeVal: 0,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },

    /** node with 1 edge connected */
    1: {
        isNode: true,
        nodeVal: 1,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },

    /** node with 2 edges connected */
    2: {
        isNode: true,
        nodeVal: 2,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },

    /** node with 3 edges connected */
    3: {
        isNode: true,
        nodeVal: 3,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },

    /** node with 4 edges connected */
    4: {
        isNode: true,
        nodeVal: 4,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },

    /** node with 5 edges connected */
    5: {
        isNode: true,
        nodeVal: 5,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },

    /** node with 6 edges connected */
    6: {
        isNode: true,
        nodeVal: 6,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },

    /** node with 7 edges connected */
    7: {
        isNode: true,
        nodeVal: 7,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },

    /** node with 8 edges connected */
    8: {
        isNode: true,
        nodeVal: 8,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },

    /** cell with 1 horizontal edge */
    9: {
        isNode: false,
        nodeVal: 0,
        isEdge: true,
        edgeVal: 1,
        isHorizontal: true,
        isVertical: false,
    },

    /** cell with 2 horizontal edges */
    10: {
        isNode: false,
        nodeVal: 0,
        isEdge: true,
        edgeVal: 2,
        isHorizontal: true,
        isVertical: false,
    },

    /** cell with 1 vertical edge */
    11: {
        isNode: false,
        nodeVal: 0,
        isEdge: true,
        edgeVal: 1,
        isHorizontal: false,
        isVertical: true,
    },

    /** cell with 2 vertical edges */
    12: {
        isNode: false,
        nodeVal: 0,
        isEdge: true,
        edgeVal: 2,
        isHorizontal: false,
        isVertical: true,
    },

    /** blank cell */
    13: {
        isNode: false,
        nodeVal: 0,
        isEdge: false,
        edgeVal: 0,
        isHorizontal: false,
        isVertical: false,
    },
};


// ----------------------------------------------------------------
// utility functions for cells
// ----------------------------------------------------------------
/** checks if the cells are equal */
const areEqual = (cellA: Cell, cellB: Cell): boolean => {
    return cellA === cellB;
};

/** returns the cell index given a row and col */
const getIndex = (hashi: Hashi, row: number, col: number): number => {
    return hashi.indexLookup[row][col];
};

/** returns the cell given a row and col */
const getCell = (hashi: Hashi, row: number, col: number): Cell => {
    const index = getIndex(hashi, row, col);
    return hashi.cells[index];
};

/** returns information about the cell */
export const getCellInfo = (cell: Cell): CellInfo => {
    return CELLS[cell];
};

/** updates the cell at row, col */
export const updateCell = (
    hashi: Hashi,
    index: number,
    update: Cell
): Hashi => {
    const next = { ...hashi };
    next.cells = [...next.cells];
    next.cells[index] = update;
    return next;
};


// ----------------------------------------------------------------
// utility functions for boards
// ----------------------------------------------------------------
/** creates a blank board at the given size */
export const initialize = (rows: number, cols: number): Hashi => {
    // const total = rows * cols;
    const cells: Array<Cell> = [];
    const relations: Array<{
        row: number;
        col: number;
        left: number | null;
        up: number | null;
        right: number | null;
        down: number | null; }> = [];
    const indexLookup: Array<Array<number>> = [];
    for (let row = 0; row < rows; row += 1) {
        indexLookup.push([]);
        for (let col = 0; col < cols; col += 1) {
            const index = cols * row + col;
            cells.push(DEFAULT_CELL);
            relations.push({
                row,
                col,
                left: col > 0 ? index - 1 : null,
                up: row > 0 ? index - cols : null,
                right: col < cols + 1 ? index + 1 : null,
                down: row < rows + 1 ? index + cols : null,
            });
            indexLookup[row].push(index);
        }
    }
    return {
        rows,
        cols,
        cells,
        relations,
        indexLookup,
    };
};

/** clears all non node values */
export const resetHashi = (previous: Hashi): Hashi => {
    const next = { ...previous };
    next.cells = next.cells.map((cell) => {
        const info = getCellInfo(cell);
        return info.isNode ? cell : DEFAULT_CELL;
    });
    return next;
};

/** clears all values */
export const clearHashi = (previous: Hashi): Hashi => {
    return initialize(previous.rows, previous.cols);
};

/** resizes board, while preserving as many values as possible */
export const resizeHashi = (
    previous: Hashi,
    rows: number,
    cols: number
): Hashi => {
    const next = initialize(rows, cols);
    const minRows = Math.min(previous.rows, rows);
    const minCols = Math.max(previous.cols, cols);
    for (let row = 0; row < minRows; row += 1) {
        for (let col = 0; col < minCols; col += 1) {
            const previousCell = getCell(previous, row, col);
            const info = getCellInfo(previousCell);
            const index = getIndex(next, row, col);
            next.cells[index] = info.isNode ? previousCell : DEFAULT_CELL;
        }
    }
    return next;
};


// ----------------------------------------------------------------
// io functions for hashi puzzles
// ----------------------------------------------------------------
/** exports a hashi to json */
export const hashiToJson = (hashi: Hashi, name?: string): JsonHashi => {
    const nodes = {} as Record<string, number>;
    hashi.cells.forEach((cell, index) => {
        const info = getCellInfo(cell);
        if (info.isNode) {
            nodes[index.toString()] = cell;
        }
    });
    return {
        name: name ?? '',
        rows: hashi.rows,
        cols: hashi.cols,
        nodes,
    };
};

/** initializes a hashi from the json */
export const hashiFromJson = (jHashi: JsonHashi): Hashi => {
    const hashi = initialize(jHashi.rows, jHashi.cols);
    hashi.cells = hashi.cells.map((cell, index) => {
        const indexStr = index.toString();
        return indexStr in jHashi.nodes ? jHashi.nodes[indexStr] : cell;
    });
    return hashi;
};


// ----------------------------------------------------------------
// solving process
// ----------------------------------------------------------------
/** takes one step in solving process */
export const solveStep = (hashi: Hashi): Hashi => {
    console.log('solving');
    return hashi;
};
