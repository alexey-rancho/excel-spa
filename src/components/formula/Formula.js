import { $ } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options = {}) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options,
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" 
                contenteditable 
                spellcheck="false" 
                data-type="formula-input"
            ></div>
        `
    }

    init() {
        super.init()
        this.input = this.$root.find('[data-type="formula-input"]')
        this.$subscribe('table:select', (text) => {
            this.input.content = text
        })
        this.$subscribe('table:input', (text) => {
            this.input.content = text
        })
    }

    onInput(event) {
        this.$notify('formula:input', $(event.target).content)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$notify('formula:enter')
        }
    }
}
