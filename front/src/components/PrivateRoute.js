import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuthToken()
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>

    )} />
)

function checkAuthToken() {
    const authToken = sessionStorage.getItem('x-auth-token')
    return authToken && authToken !== 'undefined'
}