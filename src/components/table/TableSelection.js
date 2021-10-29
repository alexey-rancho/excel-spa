import { range } from '../../core/utils'

const CLASS_NAME = 'selected'

export class TableSelection {
    constructor() {
        this.group = []
        this.current = null
    }

    clear() {
        this.group.forEach(($el) => $el.removeClass(CLASS_NAME))
        this.group = []
    }

    add($el) {
        this.group.push($el)
        this.current = $el
    }

    /**
     * @param {Dom} $el instance of Dom class
     */
    select($el) {
        this.clear()
        $el.addClass(CLASS_NAME)
        $el.focus()
        this.add($el)
    }

    selectGroup($el, $root) {
        this.clear()
        const current = this.current.id(true)
        const target = $el.id(true)
        const rows = range(current.row, target.row)
        const cols = range(current.col, target.col)
        const ids = rows.reduce((acc, row) => {
            cols.forEach((col) => acc.push(`${row}:${col}`))
            return acc
        }, [])
        this.group = ids.map((id) => {
            const cell = $root.find(`[data-id="${id}"]`)
            cell.addClass(CLASS_NAME)
            return cell
        })
    }
}
