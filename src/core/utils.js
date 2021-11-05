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

export function addToLocalStorage(key, data) {
    if (key == null || data == null) {
        throw new Error('key or data must not be null or undefined')
    }
    localStorage.setItem(key, JSON.stringify(data))
}

export function getItemFromLocalStorage(key) {
    if (key == null) {
        throw new Error('key must not be null or undefined')
    }
    const item = localStorage.getItem(key)
    return JSON.parse(item)
}

/**
 * @param {Number} letterNumber serial number of alphabet letter
 * @return {String} alphabet letter corresponding to its serial number
 */
export function toAlphabetLetter(letterNumber = 1) {
    return String.fromCharCode(letterNumber + 64)
}

/**
 * @param {Object} object object for verifying
 * @param  {Array} expectedKeys array of expected keys in string
 * @param {Boolean} throwError (true by default) if true and object doesn't have
 * provided expected keys, error will be thrown, otherwise console.warn()
 * @return {Boolean} true if provided object includes expected keys, false
 * if it doesn't and console.warn() has been invoked
 */
export function verifyObjectKeys(object, expectedKeys = [], throwError = true) {
    const objectKeys = Object.keys(object)
    const missingKeys = []
    expectedKeys.forEach((key) => {
        if (!objectKeys.includes(key)) {
            missingKeys.push(key)
        }
    })

    if (missingKeys.length > 0) {
        const errorMessage = `Object must have [${missingKeys.join(', ')}] keys`
        if (throwError) {
            throw new Error(errorMessage)
        }
        console.warn(errorMessage)
        return false
    }

    return true
}
