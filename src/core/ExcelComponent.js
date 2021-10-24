import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.prepare()
    }

    /**
     * @return {string} returns component template
     */
    toHTML() {
        return ''
    }

    /**
     * This method is needed for simplifying
     * and separating init method
     */
    prepare() {}

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
    }
}
