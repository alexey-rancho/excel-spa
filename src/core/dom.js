class Dom {
    // selector can be #app, .app etc
    // or it can be DOM Node, HTMLElement (Element)
    constructor(selector) {
        this.$nativeEl =
            typeof selector === 'string'
                ? document.querySelector(selector)
                : selector
    }

    get textContent() {
        return this.$nativeEl.textContent
    }

    set textContent(content) {
        this.$nativeEl.textContent = content
    }

    get data() {
        return this.$nativeEl instanceof Dom
            ? this.$nativeEl.data
            : this.$nativeEl.dataset
    }

    get classes() {
        return this.$nativeEl instanceof Dom
            ? this.$nativeEl.classes
            : this.$nativeEl.classList
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
     * @param {Dom/Node} elements element/elements for appending
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
            return el instanceof Dom ? el.$nativeEl : el
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

    getCoords() {
        return this.$nativeEl instanceof Dom
            ? this.$nativeEl.getCoords()
            : this.$nativeEl.getBoundingClientRect()
    }

    closest(selector) {
        return $(this.$nativeEl.closest(selector))
    }

    find(selector) {
        return this.$nativeEl instanceof Dom
            ? this.$nativeEl.find(selector)
            : $(this.$nativeEl.querySelector(selector))
    }

    findAll(selector) {
        const elements = Array
            .from(this.$nativeEl.querySelectorAll(selector))
            .map((el) => $(el))
        return elements
    }

    css(styles = {}) {
        Object.keys(styles).forEach((key) => {
            this.$nativeEl.style[key] = styles[key]
        })
    }

    offset() {
        const coords = this.getCoords()
        const scrollX = window.scrollX || document.documentElement.scrollLeft
        const scrollY = window.scrollY || document.documentElement.scrollTop
        return {
            left: coords.x + scrollX,
            top: coords.y + scrollY,
            right: coords.right + scrollX,
            bottom: coords.bottom + scrollY,
        }
    }

    addClass(className) {
        if (this.$nativeEl instanceof Dom) {
            return this.$nativeEl.addClass(className)
        }
        return this.$nativeEl.classList.add(className)
    }

    removeClass(className) {
        if (this.$nativeEl instanceof Dom) {
            return this.$nativeEl.removeClass(className)
        }
        return this.$nativeEl.classList.remove(className)
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
