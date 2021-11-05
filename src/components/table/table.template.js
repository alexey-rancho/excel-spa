import { toAlphabetLetter } from '../../core/utils'

const DEFAULT_COLUMN_WIDTH = '120px'
const DEFAULT_ROW_HEIGHT = '24px'

export function createTable(state) {
    const columnsCount = state.table.columnsCount
    const rowsCount = state.table.rowsCount
    return `
        ${createHeader(columnsCount, state)}
        ${createBody(columnsCount, rowsCount, state)}
    `
}

function createHeader(columnsCount, state) {
    const columns = new Array(columnsCount)
        .fill('')
        .map((_, index) => {
            const width = getCellWidth(index, state)
            return createColumn(index, width)
        })
        .join('')
    return createRow(null, columns)
}

function createCells(columnsCount, state) {
    return (_, rowIndex) => {
        const cells = new Array(columnsCount)
            .fill('')
            .map(createCellWithState(rowIndex, state))
            .join('')
        const height = getRowHeight(rowIndex, state)
        return createRow(rowIndex, cells, height)
    }
}

function createBody(columnsCount, rowsCount, state) {
    const rows = new Array(rowsCount)
        .fill('')
        .map(createCells(columnsCount, state))
        .join('')
    return rows
}

function getCellWidth(index, state) {
    const columnSizes = state.table.columnSizes
    const columnSize = columnSizes.find((size) => {
        return size.index === index
    })
    return columnSize
        ? columnSize.size + 'px'
        : DEFAULT_COLUMN_WIDTH
}

function getRowHeight(index, state) {
    const rowSizes = state.table.rowSizes
    const rowSize = rowSizes.find((size) => {
        return size.index === index
    })
    return rowSize
        ? rowSize.size + 'px'
        : DEFAULT_ROW_HEIGHT
}

function getCellContent(id, state) {
    const cellContents = state.table.cellContents
    const cellContent = cellContents.find((content) => {
        return content.id === id
    })
    return cellContent ? cellContent.content : ''
}

function createColumn(index, width) {
    const letter = toAlphabetLetter(index + 1)
    return `
        <div class="column" 
            data-type="resizable"
            data-col="${index}"
            style="width: ${width};"
        >
            ${letter || ''}
            <div class="col-resize" data-resize-type="col"></div>
        </div>
    `
}

function createCell(options) {
    return `
        <div class="cell"
            contenteditable 
            data-type="selectable"
            data-col="${options.colIndex}"
            data-row="${options.rowIndex}"
            data-id="${options.rowIndex}:${options.colIndex}"
            style="width: ${options.width};"
        >
            ${options.content}
        </div>
    `
}

function createCellWithState(rowIndex, state) {
    return (_, colIndex) => {
        const width = getCellWidth(colIndex, state)
        const id = `${rowIndex}:${colIndex}`
        const content = getCellContent(id, state)
        return createCell({
            rowIndex,
            colIndex,
            id,
            width,
            content,
        })
    }
}

/**
 * @param {Number} index row index
 * @param {*} body the body of the row
 * @param {String} height row height in pixels (120px, 30px and so on)
 * @return {String} html template
 */
function createRow(index, body, height = DEFAULT_ROW_HEIGHT) {
    const serialNum = typeof index === 'number' && index >= 0
        ? index + 1
        : null
    const rowResize = serialNum
        ? `<div class="row-resize" data-resize-type="row"></div>`
        : ''
    const dataType = serialNum ? `data-type="resizable"` : ''
    const dataRow = index >= 0 ? `data-row="${index}"` : ''
    return `
        <div class="row" ${dataType} ${dataRow} style="height: ${height};">
            <div class="row-info">
                ${serialNum || ''}
                ${rowResize}
            </div>
            <div class="row-data">${body || ''}</div>
        </div>
    `
}
