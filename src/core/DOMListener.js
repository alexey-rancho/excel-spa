import { capitalize } from '@core/utils'

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
            /**
             * и 1й и 2й вариант будет работать
             * в 1ом: передаётся стрелочная фн, которая НЕ имеет контекста
             * выполнения, следовательно this не будет меняться при вызове
             * коллбека в addEventListener. Но важно вызвать метод именно
             * внутри стрелочной фн и передать event нашему методу,
             * который она будет принимать
             * во 2ом: this в теле метода this[methodName] будет меняться
             * на текущий объект. И вместо this будет Object.
             */
            // this.$root.on(listener, (event) => this[methodName](event)) // 1
            this[methodName] = this[methodName].bind(this)
            this.$root.on(listener, this[methodName]) // 2
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
