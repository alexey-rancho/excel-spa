import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isResizable, isSelectable, isGroupSelectable } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'click'],
        })
    }

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const cell = this.$root.find('[data-id="0:0"]')
        this.selection.select(cell)
    }

    onMousedown(event) {
        if (isResizable(event)) {
            resizeHandler(event, this.$root)
        }
    }

    onClick(event) {
        if (isGroupSelectable(event)) {
            this.selection.selectGroup($(event.target), event, this.$root)
        } else if (isSelectable(event)) {
            this.selection.select($(event.target))
        }
    }
}
