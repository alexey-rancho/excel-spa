// Problem - listener passed into store.subscribe() is invoked
// each time when store.dispatch() is invoked. It's bad because
// whole UI is updated on each small change in store
// So, we need to create the capability to subscribe on changes in
// specific properties in store so that passed listener can be
// invoked in this point. It's an optimization of store
// and UI interaction

import { getDiff } from 'recursive-diff'

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.prevState = null
        this.unsubscribe = null
    }

    compareStates(prevState, currentState) {
        const diff = getDiff(prevState, currentState).pop()
        if (diff) {
            console.log(diff)
            const path = diff.path.slice(0, 2)
            return path.join('/')
        }
        return ''
    }

    subscribeComponents(components = []) {
        this.unsubscribe = this.store.subscribe((prevState) => {
            const path = this.compareStates(prevState, this.store.getState())
            components.forEach((comp) => comp.stateUpdated(path))
        })
    }

    unsubscribeComponents() {
        this.unsubscribe()
    }
}
