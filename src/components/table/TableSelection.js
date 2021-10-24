// import { $ } from '@core/dom'

export class TableSelection {
    constructor() {
        this.group = []
    }

    select($el) {
        this.group.forEach(($el) => $el.removeClass('selected'))
        this.group = []
        $el.addClass('selected')
        this.group.push($el)
    }

    selectGroup($el, event, $root) {
        if (event.ctrlKey) {
            $el.addClass('selected')
            this.group.push($el)
        } else if (event.shiftKey) {
            // row
            // col
            // if (this.group.length === 0)
            const arr = $el.data.id.split(':')
            const pos = { row: arr[0], col: arr[1] }
            this.group.push({ $el, pos })
            console.log(pos)
            if (this.group.length === 2) {
                this.group[0].pos.row
                this.group[0].pos.col
                this.group[1].pos.row
                this.group[1].pos.col
                $root.findAll('[data-row=""]')
            }
        }
    }
}
