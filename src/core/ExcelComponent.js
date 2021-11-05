import { DOMListener } from './DOMListener'

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.store = options.store
        this.prepare()
    }

    /**
     * @return {string} returns component template
     */
    toHTML() {
        return ''
    }

    $notify(eventName, ...args) {
        this.emitter.notify(eventName, ...args)
    }

    $subscribe(eventName, callback) {
        const unsub = this.emitter.subscribe(eventName, callback)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    $getState() {
        return this.store.getState()
    }

    $listen(listener) {
        const unsub = this.store.subscribe(listener)
        this.unsubscribers.push(unsub)
    }

    stateUpdated() {}

    /**
     * This method is needed for simplifying
     * and preparation init method
     */
    prepare() {}

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach((unsub) => unsub())
    }
}
