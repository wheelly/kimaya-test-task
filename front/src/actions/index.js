import {userConstants, endPoints} from "../constants";

// Relies on the custom API middleware defined in ../middleware/api.js.
//forms a request object for callApi
const authUser = (email, password) => ({
    types: [userConstants.LOGIN_REQUEST, userConstants.LOGIN_SUCCESS, userConstants.LOGIN_FAILURE],
    endpoint: endPoints.USER_AUTH,
    method: 'POST',
    fields: { email, password }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const signIn = (email, password) => (dispatch, getState) => {
    return dispatch(authUser(email, password))
}

const createUser = (name, email, password) => ({
    types: [userConstants.REGISTER_REQUEST, userConstants.REGISTER_SUCCESS, userConstants.REGISTER_FAILURE],
    endpoint: endPoints.USER_REGISTER,
    method: 'POST',
    fields: { name, email, password }
})


export const registerUser = (name, email, password) => (dispatch, getState) => (
    dispatch(createUser(name, email, password))
)

// resets the currently visible error message
export const resetErrorMessage = () => ({
    type: userConstants.RESET_ERROR_MESSAGE
})

export const setOkMessage = okMessage => (dispatch) => (
    dispatch({type: userConstants.SET_OK_MESSAGE, okMessage})
)

export const resetOkMessage = () => ({
    type: userConstants.RESET_OK_MESSAGE
})




