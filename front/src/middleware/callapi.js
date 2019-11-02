// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.

export const callApi = (request) => {
    const requestOptions = request.method === 'POST' ? {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.fields)
    } : request.fields
    return fetch(request.endpoint, requestOptions);
}