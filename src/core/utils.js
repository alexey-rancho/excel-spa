export function capitalize(string) {
    if (!string || typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(a, b) {
    const min = Math.min(a, b)
    const max = Math.max(a, b)
    return new Array(max - min + 1).fill('').map((_, index) => min + index)
}
