import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isResizable, isSelectable, nextSelector } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '../../core/dom'
import * as actions from '../../core/redux/actions'

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
        return createTable(this.$getState())
    }

    prepare() {
        this.selection = new TableSelection()
    }

    selectCell($cell) {
        this.selection.select($cell)
        // this.$notify('table:select', this.selection.current.content)
        this.$dispatch(actions.selectCell(this.selection.current.id()))
    }

    init() {
        super.init()

        // const currentCellId = this.$getState().table.currentCell
        // const $cell = this.$root.find(`[data-id="${currentCellId}"]`)
        // this.selectCell($cell)

        // this.$subscribe('formula:input', (text) => {
        //     this.updateCellState(text)
        //     this.selection.current.content = text
        // })
        this.$subscribe('formula:enter', () => {
            this.selection.current.focus()
        })
    }

    async resizeTable(event) {
        try {
            const resizeData = await resizeHandler(event, this.$root)
            this.$dispatch(actions.resize(resizeData))
        } catch (e) {
            console.warn(e)
        }
    }

    stateUpdated(path) {
        switch (path) {
        case 'table/currentCell': {
            console.log('table/currentCell')
            const currentCellId = this.$getState().table.currentCell
            const $cell = this.$root.find(`[data-id="${currentCellId}"]`)
            this.selection.select($cell)
            break
        }
        case 'table/cellContents': {
            console.log('table/cellContents')
            const currentCellId = this.$getState().table.currentCell
            const cellContent = this.$getState().table.cellContents
                .find((content) => content.id === currentCellId)
            if (cellContent) {
                this.selection.current.content = cellContent.content
            } else {
                this.selection.current.content = ''
            }
            break
        }
        case 'table/columnSizes': {
            console.log('table/columnSizes')
            break
        }
        case 'table/rowSizes': {
            console.log('table/rowSizes')
            break
        }
        }
    }

    onMousedown(event) {
        if (isResizable(event)) {
            this.resizeTable(event)
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

    // updates state (content) of current chosen cell
    updateCellState(content) {
        this.$dispatch(actions.inputText(content))
    }

    onInput() {
        const cellContent = this.selection.current.content
        // this.$notify('table:input', cellContent)
        this.updateCellState(cellContent)
    }
}
