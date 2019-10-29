import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loadUserSession } from '../store/sessionStore'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        loadUserSession()
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>

    )} />
)