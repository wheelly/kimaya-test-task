import q from 'querystring';
// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.

export const callApi = (request) => {

    const token = sessionStorage.getItem('x-auth-token')
    const tokenHeader = token ? {'x-auth-token': token } : {}

    switch ( request.method ) {
        case 'POST':
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', ...tokenHeader},
                body: JSON.stringify(request.fields),
            }
            return fetch(request.endpoint, requestOptions)
        case 'GET':
            return fetch(`${request.endpoint}?${q.stringify(request.fields)}`, {headers: tokenHeader})
        default:
            console.log(`Method ${request.method} not implemented`)
            throw new Error(`Method ${request.method} not implemented`)
    }
}