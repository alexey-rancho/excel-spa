import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isResizable, isSelectable, nextSelector } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/dom'

export const COLUMNS_COUNT = 26
export const ROWS_COUNT = 20

const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter']

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options = {}) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        })
    }

    toHTML() {
        return createTable(COLUMNS_COUNT, ROWS_COUNT)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$notify('table:select', this.selection.current.content)
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)
        this.$subscribe('formula:input', (text) => {
            this.selection.current.content = text
        })
        this.$subscribe('formula:enter', () => {
            this.selection.current.focus()
        })
    }

    onMousedown(event) {
        if (isResizable(event)) {
            resizeHandler(event, this.$root)
        }
        if (isSelectable(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                this.selection.selectGroup($target, this.$root)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $cell = this.$root.find(nextSelector(event.key, id))
            this.selectCell($cell)
        }
    }

    onInput() {
        this.$notify('table:input', this.selection.current.content)
    }
}
