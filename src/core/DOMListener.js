import { capitalize } from './utils'

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) throw new Error('no $root provided')
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach((listener) => {
            const methodName = getListenerMethodName(listener)
            verifyMethodExistence(this, methodName)
            this[methodName] = this[methodName].bind(this)
            this.$root.on(listener, this[methodName])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const methodName = getListenerMethodName(listener)
            verifyMethodExistence(this, methodName)
            this.$root.off(listener, this[methodName])
        })
    }
}

function getListenerMethodName(eventType) {
    return 'on' + capitalize(eventType)
}

function verifyMethodExistence(thisArg, methodName) {
    if (!thisArg[methodName]) {
        throw new Error(
            `${thisArg.name} component doesn't have ${methodName} method`
        )
    }
}
