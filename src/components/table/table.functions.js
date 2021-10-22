/**
 * @param {Event} event event from listener
 * @return {Boolean} it returns true if event target
 * is resizable, otherwise false
 */
export function isResizable(event) {
    return event.target.dataset.resizeType
}
