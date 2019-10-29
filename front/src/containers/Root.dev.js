import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route } from 'react-router-dom'

import Login from '../components/UserAuth/Login'
import CreateAccount from "../components/UserAuth/CreateAccount"
import HomePage from '../components/HomePage'
import AdminPage from '../components/AdminPage'
import { PrivateRoute } from '../components/PrivateRoute'

//TODO comment out these 2 lines to test on real backend
import ConfigureFakeBackend from '../dev/fake-backend'
ConfigureFakeBackend()

const Root = ({ store }) => (
    <Provider store={store}>
        <div>
            {/* User Auth logic */}
            <Route path="/login" component={Login}/>
            <Route path="/create_account" component={CreateAccount}/>
            {/* Main app logic */}
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/grid" component={AdminPage} />
            <DevTools />
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root