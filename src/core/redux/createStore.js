// redux uses function instead of classes to achieve encapsulation
// using closure concept in methods of returned object
export function createStore(rootReducer, preloadedState) {
    let listeners = []
    let isDispatching = false

    let state = rootReducer(
        preloadedState || state,
        { type: 'INIT_APP' }
    )

    return {
        /**
         * @param {Function} listener callback that will be executed each time
         * when store.dispatch() is invoked
         * @return {Function} unsubscribe function that deletes listener
         * that's been passed into store.subscribe()
         */
        subscribe(listener) {
            if (typeof listener !== 'function') {
                throw new Error('Expected the listener to be a function')
            }
            if (isDispatching) {
                throw new Error(
                    'You may not call store.listen() ' +
                        'while the reducer is executing'
                )
            }
            listeners.push(listener)
            return () => {
                if (isDispatching) {
                    throw new Error(
                        'You may not unsubscribe from a store listener ' +
                            'while the reducer is executing.'
                    )
                }
                listeners = listeners.filter((fn) => fn !== listener)
            }
        },
        dispatch(action) {
            if (isDispatching) {
                throw new Error('Reducers may not dispatch actions.')
            }

            const prevState = state

            try {
                isDispatching = true
                state = rootReducer(state, action)
            } finally {
                isDispatching = false
            }

            listeners.forEach((fn) => fn(prevState))
            return action
        },
        getState() {
            if (isDispatching) {
                throw new Error(
                    'You may not call store.getState() ' +
                        'while the reducer is executing'
                )
            }
            return state
        },
    }
}
