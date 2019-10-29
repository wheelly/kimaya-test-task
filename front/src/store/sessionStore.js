export const loadState = () => loadItem('state')
export const loadUserSession = () => loadItem('user')

export const saveState = state => {
    try {
        if ( state.hasOwnProperty('userAuth') && state.userAuth.hasOwnProperty('sessionId')) {
            sessionStorage.setItem('user',  JSON.stringify(state.userAuth))
        }
        const serializeState = JSON.stringify(state)
        sessionStorage.setItem('state', serializeState)
    } catch (err) { }
}

const loadItem = (key) => {
    try {
        const serializeState = sessionStorage.getItem(key)
        if ( serializeState ) {
            return JSON.parse(serializeState)
        }
    } catch (err) {
        return undefined
    }
}