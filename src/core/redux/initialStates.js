const ALPHABET_LENGTH = 26
const DEFAULT_ROWS_COUNT = 20
const INITIAL_CELL_ID = '0:0'

export const tableInitialState = {
    currentCell: INITIAL_CELL_ID,
    selectedCells: [],
    cellContents: [],
    columnSizes: [],
    rowSizes: [],
    columnsCount: ALPHABET_LENGTH,
    rowsCount: DEFAULT_ROWS_COUNT,
}

export const headerInitialState = {
    tableName: 'New table',
}
