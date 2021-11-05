import { $ } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'
import * as actions from '../../core/redux/actions'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options = {}) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'keydown'],
            ...options,
        })
    }

    init() {
        super.init()
        this.tableName = this.$root.find('[data-type="table-name"]')
        this.updateTableName()
    }

    toHTML() {
        return `
            <input type="text" class="input" data-type="table-name" />
            <div>
                <div class="button">
                <i class="material-icons">delete</i>
                </div>
                <div class="button">
                <i class="material-icons">exit_to_app</i>
                </div>
            </div>
            </div>
        `
    }

    updateTableName() {
        this.tableName.content = this.$getState().header.tableName
    }

    stateUpdated(path) {
        switch (path) {
        case 'header/tableName':
            console.log('header/tableName')
            this.updateTableName()
        }
    }

    onInput(event) {
        const target = $(event.target)
        this.$dispatch(actions.renameTable(target.content))
    }

    onKeydown(event) {
        const target = $(event.target)
        if (target.data.type === 'table-name') {
            if (event.key === 'Enter') {
                target.blur()
            }
        }
    }
}
