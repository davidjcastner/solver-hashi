import type { Cell } from './Cell';

/** everything needed to  */
export type Hashi = {

    /** total rows */
    rows: number;

    /** total columns */
    cols: number;

    /** cell information by index */
    cells: Array<Cell>;

    /** positional information by index */
    relations: Array<{
        row: number;
        col: number;
        left: number | null;
        up: number | null;
        right: number | null;
        down: number | null;
    }>;

    /** indexes sorted by row, col */
    indexLookup: Array<Array<number>>;
};
