class Dom {
    /**
     * @param {String/Element} selector if selector is a string,
     * document.querySelector
     * is used for finding element for $nativeEl. If selector
     * is instance of Element, $nativeEl is selector
     */
    constructor(selector) {
        this.$nativeEl =
            typeof selector === 'string'
                ? document.querySelector(selector)
                : selector
    }

    set content(text) {
        if (typeof this.$nativeEl.value === 'string') {
            this.$nativeEl.value = text
        } else {
            this.$nativeEl.textContent = text
        }
    }

    get content() {
        if (typeof this.$nativeEl.value === 'string') {
            return this.$nativeEl.value.trim()
        }
        return this.$nativeEl.textContent.trim()
    }

    get html() {
        return this.$nativeEl.innerHTML
    }

    set html(html) {
        if (typeof html === 'string') {
            this.$nativeEl.innerHTML = html
        }
    }

    get data() {
        return this.$nativeEl.dataset
    }

    get classes() {
        return this.$nativeEl.classList
    }

    /**
     * @param {Dom/Element} elements element/elements for appending
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
        if (verifyListenerArgs(eventType, callback)) {
            this.$nativeEl.addEventListener(eventType, callback)
        }
        return this
    }

    off(eventType, callback) {
        if (verifyListenerArgs(eventType, callback)) {
            this.$nativeEl.removeEventListener(eventType, callback)
        }
        return this
    }

    getCoords() {
        return this.$nativeEl.getBoundingClientRect()
    }

    closest(selector) {
        return $(this.$nativeEl.closest(selector))
    }

    find(selector) {
        return $(this.$nativeEl.querySelector(selector))
    }

    findAll(selector) {
        const elements = [...this.$nativeEl.querySelectorAll(selector)]
            .map((el) => $(el))
        return elements
    }

    css(styles = {}) {
        Object.entries(styles).forEach(([key, value]) => {
            this.$nativeEl.style[key] = value
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
        this.$nativeEl.classList.add(className)
    }

    removeClass(className) {
        this.$nativeEl.classList.remove(className)
    }

    /**
     * @param {Boolean} parse if parse is true, parsed into object id returns,
     * otherwise no-parsed string id returns
     * @return {Object/String}
     */
    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return { row: +parsed[0], col: +parsed[1] }
        }
        return this.data.id
    }

    focus() {
        this.$nativeEl.focus()
    }

    blur() {
        this.$nativeEl.blur()
    }
}

function verifyListenerArgs(eventType, callback) {
    return typeof eventType === 'string' && typeof callback === 'function'
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, className) => {
    const $el = document.createElement(tagName)
    if (className) $el.classList.add(className)
    return $($el)
}
