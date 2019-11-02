import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import {Route} from 'react-router-dom'

import Login from '../components/UserAuth/Login'
import CreateAccount from "../components/UserAuth/CreateAccount"
import HomePage from '../components/HomePage'
import { PrivateRoute } from '../components/PrivateRoute'
import AdminPage from "../components/AdminPage";


const Root = ({ store }) => (
    <Provider store={store}>
        <div>
            {/* User Auth logic */}
            <Route path="/login" component={Login}/>
            <Route path="/create_account" component={CreateAccount}/>
            {/* Main app logic */}
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/admin" component={AdminPage} />
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
}
export default Root