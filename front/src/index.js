import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { saveState } from "./store/sessionStore";

const store = configureStore()

store.subscribe(() => {
    saveState(store.getState());
})

render(
    <Router>
        <Root store={store} />
    </Router>,
    document.getElementById('root')
)

