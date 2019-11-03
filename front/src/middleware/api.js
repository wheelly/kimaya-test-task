import { callApi } from './callapi'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => async action => {

    const { fields, types } = action
    let { endpoint } = action

    if (! endpoint) {
        return next(action)
    }

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }

    if (fields && ( typeof fields !== 'object')) {
        throw new Error('Fields must be key=val object')
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        return Object.assign({}, action, data)
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType }))

    try {
        const token = sessionStorage.getItem('x-auth-token')
        let tokenHeader = {}

        if (token)
            tokenHeader['x-auth-token'] = token

        const response = await callApi(action, tokenHeader)
        const json_s = await response.json()
        return next(actionWith({
            response: JSON.parse(json_s),
            type: successType
        }))
    } catch (e) {
        return next(actionWith({
            type: failureType,
            error: e.message || 'Something bad happened'
        }))
    }

}
