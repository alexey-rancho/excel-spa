import { Excel } from './components/excel/Excel'
import { Header } from './components/header/Header'
import { Toolbar } from './components/toolbar/Toolbar'
import { Formula } from './components/formula/Formula'
import { Table } from './components/table/Table'
import { createStore } from './core/redux/createStore'
import { rootReducer } from './core/redux/rootReducer'
import './style/app.scss'
import { addToLocalStorage, getItemFromLocalStorage } from './core/utils'

function loadStoreToLocalStorage(store) {
    const state = store.getState()
    Object.keys(state).forEach((key) => {
        addToLocalStorage(key, state[key])
    })
}

function createStateFromLocalStorage() {
    const state = {}
    Object.keys(localStorage).forEach((key) => {
        state[key] = getItemFromLocalStorage(key)
    })
    return state
}

const preloadedState = createStateFromLocalStorage()
const store = createStore(rootReducer, preloadedState)
store.subscribe(() => loadStoreToLocalStorage(store))

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store,
})

excel.render()
