/** all action types for the hashi reducers */
export enum HashiAction {
    // actions for switching modes
    SOLVE = 'solve',
    PAUSE = 'pause',
    RESET = 'reset',

    // actions for switching which solution to display
    SWITCH_DISPLAY = 'switchDisplay',

    // actions for setting up board
    CLEAR = 'clear',
    SET_SIZE = 'setSize',
    SET_CELL = 'setCell',
    SET_EXAMPLE = 'setExample',

    // other actions
    CHANGE_SPEED = 'changeSpeed'
}
