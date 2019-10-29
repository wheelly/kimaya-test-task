// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = async (request) => {

    const requestOptions = request.method === 'POST' ? {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request.fields)
    } : request.fields

    try {
        const res = await fetch(request.endpoint, requestOptions);
        const json = await res.json();
        if (!res.ok)
            return await Promise.reject(json);
        return JSON.parse(json);
    } catch (e) {
        return await Promise.reject(e)
    }
}

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
        const res = await callApi(action)
        next(actionWith({
            res,
            type: successType
        }))
    } catch (e) {
        next(actionWith({
            type: failureType,
            error: e.message || 'Something bad happened'
        }))
    }

}
