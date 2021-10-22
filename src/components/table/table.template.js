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
        .map((val, index) => {
            const letter = toAlphabetLetter(index + 1)
            return createColumn(letter, index)
        })
        .join('')
    return createRow(null, columns)
}

function createBody(columnsCount, rowsCount) {
    const cells = new Array(columnsCount)
        .fill('')
        .map((val, index) => createCell(null, index))
        .join('')
    const rows = new Array(rowsCount)
        .fill('')
        .map((val, index) => createRow(index + 1, cells))
        .join('')
    return rows
}

function createColumn(letter, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${letter || ''}
            <div class="col-resize" data-resize-type="col"></div>
        </div>
    `
}

function createCell(content, index) {
    return `
        <div class="cell" contenteditable data-col="${index}">
            ${content || ''}
        </div>
    `
}
/**
 * @param {*} rowInfo if it passed, resize element and
 * data-type="resizable"are added
 * @param {*} rowData the body of the row
 * @return {String} html template
 */
function createRow(rowInfo, rowData) {
    const rowResize = rowInfo
        ? `<div class="row-resize" data-resize-type="row"></div>`
        : ''
    const dataType = rowInfo
        ? `data-type="resizable"`
        : ''
    return `
        <div class="row" ${dataType}>
            <div class="row-info">
                ${rowInfo || ''}
                ${rowResize}
            </div>
            <div class="row-data">${rowData || ''}</div>
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
