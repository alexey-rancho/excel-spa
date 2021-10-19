const ALPHABET_LENGTH = 26

export function createTable(columnsCount = ALPHABET_LENGTH, rowsCount = 15) {
    return `
        ${createHeader(columnsCount)}
        ${createBody(columnsCount, rowsCount)}
    `
}

function createHeader(columnsCount) {
    const columns = new Array(columnsCount)
        .fill('')
        .map((val, index) => {
            const letter = convertToAlphabetLetter(index + 1)
            return createColumn(letter)
        })
        .join('')
    return createRow(null, columns)
}

function createBody(columnsCount, rowsCount) {
    const cells = new Array(columnsCount)
        .fill(createCell())
        .join('')
    const rows = new Array(rowsCount)
        .fill('')
        .map((val, index) => createRow(index + 1, cells))
        .join('')
    return rows
}

function createColumn(letter) {
    return `<div class="column">${letter || ''}</div>`
}

function createCell(content) {
    return `<div class="cell" contenteditable>${content || ''}</div>`
}

function createRow(rowInfo, rowData) {
    return `
        <div class="row">
            <div class="row-info">${rowInfo || ''}</div>
            <div class="row-data">${rowData || ''}</div>
        </div>
    `
}

/**
 * @param {Number} letterNumber serial number of alphabet letter
 * @return {String} alphabet letter corresponding to its serial number
 */
function convertToAlphabetLetter(letterNumber = 1) {
    if (letterNumber > ALPHABET_LENGTH) {
        letterNumber = letterNumber % ALPHABET_LENGTH
    }
    return String.fromCharCode(letterNumber + 64)
}
