class Dom {
    // selector can be #app, .app etc
    // or it can be DOM Node, HTMLElement (Element)
    constructor(selector) {
        this.$nativeEl = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    // both getter and setter
    html(html) {
        if (typeof html === 'string') {
            this.$nativeEl.innerHTML = html
            return this
        }
        return this.$nativeEl.innerHTML
    }

    clear() {
        this.html('')
        return this
    }

    /**
     * @param {Dom/Node} elements element/elemetns for appending
     * @return {Dom} Dom instance
     * -
     * Polyfill for append method. If browser supports append(),
     * function uses Element.prototype.append
     * otherwise appendChild is used
     * If no parameters passed, it returns Dom instance
     */
    append(...elements) {
        if (elements.length === 0) return this
        elements = elements.map((el) => {
            return el instanceof Dom
                ? el.$nativeEl
                : el
        })
        if (Element.prototype.append) {
            this.$nativeEl.append(...elements)
            return this
        }
        elements.forEach((el) => this.$nativeEl.appendChild(el))
        return this
    }

    on(eventType, callback) {
        if (eventType && callback) {
            this.$nativeEl.addEventListener(eventType, callback)
        }
        return this
    }

    off(eventType, callback) {
        if (eventType && callback) {
            this.$nativeEl.removeEventListener(eventType, callback)
        }
        return this
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, className) => {
    const $el = document.createElement(tagName)
    if (className) $el.classList.add(className)
    return $($el)
}
