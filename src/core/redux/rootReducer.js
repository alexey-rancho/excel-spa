import {
    RENAME_TABLE,
    RESIZE_COLUMN,
    RESIZE_ROW,
    SELECT_CELL,
    TEXT_INPUT,
} from './types'

import combineReducers from 'combine-reducers'
import { headerInitialState, tableInitialState } from './initialStates'

function tableReducer(state = tableInitialState, action) {
    switch (action.type) {
    case SELECT_CELL: {
        const cellId = action.payload
        return { ...state, currentCell: cellId }
    }
    case RESIZE_COLUMN: {
        const nextColumnSize = action.payload
        const columnSizes = filterObjectArrayByKey(
            state.columnSizes, nextColumnSize, 'index'
        )
        columnSizes.push(nextColumnSize)
        return { ...state, columnSizes }
    }
    case RESIZE_ROW: {
        const nextRowSize = action.payload
        const rowSizes = filterObjectArrayByKey(
            state.rowSizes, nextRowSize, 'index'
        )
        rowSizes.push(nextRowSize)
        return { ...state, rowSizes }
    }
    case TEXT_INPUT: {
        const nextCellValue = { id: state.currentCell, content: action.payload }
        const cellContents = filterObjectArrayByKey(
            state.cellContents, nextCellValue, 'id'
        )
        if (nextCellValue.content) {
            cellContents.push(nextCellValue)
        }
        return { ...state, cellContents }
    }
    default:
        return state
    }
}

function filterObjectArrayByKey(array, object, key) {
    if (array == null || object == null) {
        return
    }

    const filteredArray = array.filter((o) => {
        return o[key] !== object[key]
    })

    return filteredArray
}

function headerReducer(state = headerInitialState, action) {
    switch (action.type) {
    case RENAME_TABLE:
        return { ...state, tableName: action.payload }
    default:
        return state
    }
}

export const rootReducer = combineReducers({
    header: headerReducer,
    table: tableReducer,
})
