import { $ } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'
import { inputText } from '../../core/redux/actions'

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
        // this.$subscribe('table:select', (text) => {
        //     this.input.content = text
        // })
        // this.$subscribe('table:input', (text) => {
        //     this.input.content = text
        // })
    }

    getCellContent() {
        const currentCellId = this.$getState().table.currentCell
        const cellContent = this.$getState().table.cellContents
            .find((content) => content.id === currentCellId)
        if (cellContent) {
            this.input.content = cellContent.content
        } else {
            this.input.content = ''
        }
    }

    stateUpdated(path) {
        switch (path) {
        case 'table/cellContents':
        case 'table/currentCell': {
            this.getCellContent()
            break
        }
        }
    }

    onInput(event) {
        const content = $(event.target).content
        this.$dispatch(inputText(content))
        // this.$notify('formula:input', content)
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$notify('formula:enter')
        }
    }
}
