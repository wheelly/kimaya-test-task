import { userConstants } from '../constants'
import { combineReducers } from 'redux'
import { getStats } from './admingrid';
import { searchCore, playVideo } from './search';

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
    const { type, error } = action

    if (type === userConstants.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return error
    }
    return state
}

const okMessage = (state = null, action) => {
    const { type, okMessage } = action

    if (type === userConstants.RESET_OK_MESSAGE) {
        return null
    } else if ( type === userConstants.SET_OK_MESSAGE ) {
        return okMessage
    }
    return state
}

const userAuth = (state = {}, action)  => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {}
        case userConstants.LOGIN_SUCCESS:
            const r = action.response
            return { type: action.type, ...r.body, 'x-auth-token': r.header['x-auth-token'] }
        case userConstants.LOGIN_FAILURE:
            return {};
        default:
            return state
    }
}

const userReg = (state = {}, action)  => {
    switch (action.type) {
        case userConstants.REGISTER_SUCCESS:
            const r = action.response
            return { type: action.type, ...r.body, 'x-auth-token': r.header['x-auth-token'] }
        case userConstants.REGISTER_REQUEST:
            return {}
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}

const userLogoff = (state = {}, action)  => {
    if (action.type === userConstants.LOGOFF )
        return {}
    return state
}

const rootReducer = combineReducers({
    userAuth,
    userReg,
    userLogoff,
    searchCore,
    playVideo,
    errorMessage,
    okMessage,
    getStats
})

export default rootReducer