import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import writeStats from '../middleware/write_stats'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api, writeStats)
)

export default configureStore
