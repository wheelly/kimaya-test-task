import { userConstants } from '../constants'
import { combineReducers } from 'redux'
import { getUserStats } from "../reducers/grid";

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
            return action.response
        case userConstants.LOGIN_FAILURE:
            return {};
        default:
            return state
    }
}

const userReg = (state = {}, action)  => {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
        case userConstants.REGISTER_SUCCESS:
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
}

const userLogoff = (state = {}, action)  => {
    switch (action.type) {
        case userConstants.LOGOFF_REQUEST:
            return state
        case userConstants.LOGOFF_SUCCESS:
            return {}
        case userConstants.LOGOFF_FAILURE:
            return state
        default:
            return state
    }
}


const rootReducer = combineReducers({
    userAuth,
    userReg,
    userLogoff,
    errorMessage,
    okMessage,
    getDomains: getUserStats
})

export default rootReducer