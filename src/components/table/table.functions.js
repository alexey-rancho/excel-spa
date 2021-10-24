/**
 * @param {Event} event event from listener
 * @return {Boolean} it returns true if event target
 * is resizable, otherwise false
 */
export function isResizable(event) {
    return event.target.dataset.resizeType
}

export function isSelectable(event) {
    return typeof event.target.dataset.selectable === 'string'
}

export function isGroupSelectable(event) {
    return isSelectable(event) && (event.ctrlKey || event.shiftKey)
}
