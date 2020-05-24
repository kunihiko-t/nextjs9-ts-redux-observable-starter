import { applyMiddleware, combineReducers, compose, createStore, Middleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootEpic from '~/epics'
import rootReducer from '~/reducers'

const epicMiddleware = createEpicMiddleware()

const middleware: [Middleware] = [epicMiddleware]

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger')

    middleware.push(createLogger({ collapsed: true }))
}


declare global {
    interface Window {
        // eslint-disable-next-line no-undef
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

let composeEnhancers = compose
if (typeof window !== 'undefined') {
    composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const reducer = combineReducers({
    ...rootReducer,
})

const configStore = (initialState = {}) => {
    const createStoreWithMiddleware = composeEnhancers(
        applyMiddleware(...middleware),
    )(createStore)

    const store = createStoreWithMiddleware(
        reducer,
        initialState,
    )

    epicMiddleware.run(rootEpic)

    return {
        store,
    }
}

const { store } = configStore()

export { store }
