const ALPHABET_LENGTH = 26

export function createTable(columnsCount = ALPHABET_LENGTH, rowsCount = 20) {
    return `
        ${createHeader(columnsCount)}
        ${createBody(columnsCount, rowsCount)}
    `
}

function createHeader(columnsCount) {
    const columns = new Array(columnsCount)
        .fill('')
        .map(createColumn)
        .join('')
    return createRow(null, columns)
}

function createBody(columnsCount, rowsCount) {
    const rows = new Array(rowsCount)
        .fill('')
        .map((val, rowIndex) => {
            const cells = new Array(columnsCount)
                .fill('')
                .map(createCell(rowIndex))
                .join('')
            return createRow(rowIndex + 1, cells, rowIndex)
        })
        .join('')
    return rows
}

function createColumn(_, index) {
    const letter = toAlphabetLetter(index + 1)
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${letter || ''}
            <div class="col-resize" data-resize-type="col"></div>
        </div>
    `
}

function createCell(rowIndex) {
    return (_, colIndex) => {
        return `
            <div class="cell"
                contenteditable 
                data-selectable
                data-col="${colIndex}"
                data-row="${rowIndex}"
                data-id="${rowIndex}:${colIndex}"
            ></div>
        `
    }
}
/**
 * @param {*} info if it passed, resize element and
 * data-type="resizable" and data-row="@param index" are added
 * @param {*} body the body of the row
 * @param {Number} index row index
 * @return {String} html template
 */
function createRow(info, body, index) {
    const rowResize = info
        ? `<div class="row-resize" data-resize-type="row"></div>`
        : ''
    const dataType = info ? `data-type="resizable"` : ''
    const dataRow = index || index === 0 ? `data-row="${index}"` : ''
    return `
        <div class="row" ${dataType} ${dataRow}>
            <div class="row-info">
                ${info || ''}
                ${rowResize}
            </div>
            <div class="row-data">${body || ''}</div>
        </div>
    `
}

/**
 * @param {Number} letterNumber serial number of alphabet letter
 * @return {String} alphabet letter corresponding to its serial number
 */
function toAlphabetLetter(letterNumber = 1) {
    if (letterNumber > ALPHABET_LENGTH) {
        letterNumber = letterNumber % ALPHABET_LENGTH
    }
    return String.fromCharCode(letterNumber + 64)
}
