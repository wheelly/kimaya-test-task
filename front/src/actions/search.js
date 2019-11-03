import {userConstants, endPoints} from "../constants";

const searchCore = q => ({
    types: [userConstants.SEARCH_REQUEST, userConstants.SEARCH_SUCCESS, userConstants.SEARCH_FAILURE],
    endpoint: endPoints.SEARCH_YOUTUBE,
    method: 'GET',
    fields: { q: q }
})

export const runSearch = q => (dispatch, getState) => (
    dispatch(searchCore(q))
)
