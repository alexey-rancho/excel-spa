export class Emitter {
    constructor() {
        this.subscribers = {}
    }

    subscribe(eventName, callback) {
        this.subscribers[eventName] = this.subscribers[eventName] || []
        this.subscribers[eventName].push(callback)
        return () => {
            this.subscribers[eventName] = this.subscribers[eventName]
                .filter((fn) => fn !== callback)
        }
    }

    /**
     * @param {String} eventName
     * @param  {...any} args arguments for all the callback functions
     * @return {Boolean} true if callbacks by eventName have been invoked,
     * false if they haven't
     */
    notify(eventName, ...args) {
        if (!Array.isArray(this.subscribers[eventName])) {
            return false
        }
        this.subscribers[eventName].forEach((callback) => {
            callback(...args)
        })
        return true
    }
}
