import { COLUMNS_COUNT, ROWS_COUNT } from './Table'

/**
 * @param {Event} event event from listener
 * @return {Boolean} it returns true if event target
 * is resizable, otherwise false
 */
export function isResizable(event) {
    return event.target.dataset.resizeType
}

export function isSelectable(event) {
    return event.target.dataset.type === 'selectable'
}

export function nextSelector(key, { col, row }) {
    const MIN_VALUE = 0
    switch (key) {
    case 'ArrowLeft':
        if (col > MIN_VALUE) col--
        break
    case 'ArrowRight':
    case 'Tab':
        if (col < COLUMNS_COUNT - 1) col++
        break
    case 'ArrowUp':
        if (row > MIN_VALUE) row--
        break
    case 'ArrowDown':
    case 'Enter':
        if (row < ROWS_COUNT - 1) row++
    }
    return `[data-id="${row}:${col}"]`
}
