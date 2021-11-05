import {
    COL_RESIZE_TYPE,
    ROW_RESIZE_TYPE,
} from '../../components/table/table.resize'

import { verifyObjectKeys } from '../utils'

import {
    NONE,
    RENAME_TABLE,
    RESIZE_COLUMN,
    RESIZE_ROW,
    SELECT_CELL,
    TEXT_INPUT,
} from './types'

export const selectCell = (cellId) => {
    return { type: SELECT_CELL, payload: cellId }
}

export const renameTable = (newName) => {
    return { type: RENAME_TABLE, payload: newName || '' }
}

export const resize = (resizeData = {}) => {
    const { resizeType = '', resizeInfo = {} } = resizeData

    verifyObjectKeys(resizeInfo, ['index', 'size'], true)

    if (resizeType === COL_RESIZE_TYPE) {
        return {
            type: RESIZE_COLUMN,
            payload: resizeInfo,
        }
    }
    if (resizeType === ROW_RESIZE_TYPE) {
        return {
            type: RESIZE_ROW,
            payload: resizeInfo,
        }
    }

    return { type: NONE }
}

export const inputText = (cellContent = '') => {
    return { type: TEXT_INPUT, payload: cellContent.trim() }
}
