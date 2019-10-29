import {gridConstants, endPoints} from "../constants";

const fetchDomains = (userId, userToken) => ({
    types: [gridConstants.DOMAIN_GRID_REQUEST, gridConstants.DOMAIN_GRID_SUCCESS, gridConstants.DOMAIN_GRID_FAILURE],
    endpoint: endPoints.FETCH_GRID,
    fields: { userId, userToken }
})

export const getStats = (user) => (dispatch, getState) => (
    dispatch(fetchDomains(user.id, user.token))
)